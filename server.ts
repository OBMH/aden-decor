import express from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const DATA_FILE_PATH = path.join(process.cwd(), 'site_data.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {}

// ── Multer config for local filesystem storage ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// ── In-memory mock database ──
const db: any = {
  admins: [],
  contacts: [],
  projects: [],
  services: [],
  testimonials: [],
  settings: [],
  media: [],
  notifications: []
};

// Seed primary admin
db.admins.push({
  id: 'u_admin_1',
  email: 'admin@adandecor.com',
  name: 'المسؤول الرئيسي (Super Admin)',
  role: 'admin',
  password_hash: bcrypt.hashSync('Adan12345', 10),
  created_at: new Date().toISOString()
});

// Seed default settings
const defaultSettings: Record<string, string> = {
  "site.brand_name_ar": "عدن للديكور",
  "site.brand_name_en": "Adan Decor",
  "hero.headline_part1": "نصمم الفخامة...",
  "hero.headline_part2": "وننفذها بإتقان.",
  "hero.subtitle": "حلول متكاملة في التصميم الداخلي، التشطيبات، الواجهات، والأعمال المتخصصة، لتحول رؤيتك إلى واقع يجمع بين الجمال والجودة والدقة.",
  "hero.cta_primary": "اطلب استشارة مجانية",
  "hero.cta_secondary": "شاهد أعمالنا",
  "contact.whatsapp": "+967771258215",
  "contact.instagram": "https://www.instagram.com/adendecor/",
  "contact.youtube": "https://www.youtube.com/@Aden_decor",
  "contact.tiktok": "https://www.tiktok.com/@yemen_decor_771258215",
  "contact.facebook": "",
  "contact.snapchat": "",
  "contact.email": "",
  "contact.maps": "https://maps.app.goo.gl/6EwDsAe3HLmS1FNh7",
  "contact.location": "عدن — اليمن",
  "contact.hours": "Open 24 Hours",
};
Object.entries(defaultSettings).forEach(([key, value]) => {
  db.settings.push({ key, value, updated_at: new Date().toISOString() });
});

// ── Persistent site data store (Local JSON File) ──
let serverSiteData: any = null;

async function loadServerSiteData() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      if (raw.trim().length > 2) {
        serverSiteData = JSON.parse(raw);
        console.log("📂 [Local Storage] Loaded site data successfully from site_data.json.");
        if (serverSiteData.users && Array.isArray(serverSiteData.users) && serverSiteData.users.length > 0) {
          db.admins = serverSiteData.users;
          serverSiteData.admins = serverSiteData.users;
        } else if (serverSiteData.admins && Array.isArray(serverSiteData.admins) && serverSiteData.admins.length > 0) {
          db.admins = serverSiteData.admins;
          serverSiteData.users = serverSiteData.admins;
        }
        let authModified = false;
        db.admins = (db.admins || []).map((a: any) => {
          if (!a.password_hash || typeof a.password_hash !== 'string' || a.password_hash.trim() === '') {
            authModified = true;
            return { ...a, password_hash: bcrypt.hashSync('Adan12345', 10) };
          }
          return a;
        });
        if (!db.admins.find((a: any) => a.email === 'admin@adandecor.com')) {
          db.admins.push({
            id: 'u_admin_1', email: 'admin@adandecor.com', name: 'المسؤول الرئيسي (Super Admin)', role: 'admin',
            password_hash: bcrypt.hashSync('Adan12345', 10), created_at: new Date().toISOString()
          });
          authModified = true;
        }
        if (authModified || !serverSiteData.admins || !serverSiteData.users) {
          serverSiteData.admins = db.admins;
          serverSiteData.users = db.admins;
          try { fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(serverSiteData, null, 2), 'utf-8'); } catch(e){}
        }
        if (serverSiteData.projects && Array.isArray(serverSiteData.projects)) db.projects = serverSiteData.projects;
        if (serverSiteData.services && Array.isArray(serverSiteData.services)) db.services = serverSiteData.services;
        if (serverSiteData.testimonials && Array.isArray(serverSiteData.testimonials)) db.testimonials = serverSiteData.testimonials;
        if (serverSiteData.media && Array.isArray(serverSiteData.media)) db.media = serverSiteData.media;
        if (serverSiteData.contacts && Array.isArray(serverSiteData.contacts)) db.contacts = serverSiteData.contacts;
        if (serverSiteData.notifications && Array.isArray(serverSiteData.notifications)) db.notifications = serverSiteData.notifications;
      }
    }
  } catch (err) {
    console.error("Failed to load site_data.json:", err);
  }
}

async function saveServerSiteData(data: any) {
  try {
    serverSiteData = { ...data, last_updated: new Date().toISOString() };
    try {
      const tmpPath = DATA_FILE_PATH + '.tmp';
      fs.writeFileSync(tmpPath, JSON.stringify(serverSiteData, null, 2), 'utf-8');
      fs.renameSync(tmpPath, DATA_FILE_PATH);
    } catch (e) {
      try { fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(serverSiteData, null, 2), 'utf-8'); } catch (e2) {}
    }
    console.log("💾 [Local Storage] Database saved cleanly to site_data.json!");
  } catch (e) {
    console.error("⚠️ [Save Error]:", e);
  }
}

async function updateSiteSection(section: string, value: any) {
  if (!serverSiteData) serverSiteData = {};
  serverSiteData[section] = value;
  serverSiteData['last_updated'] = new Date().toISOString();

  if (section === 'projects' && Array.isArray(value)) db.projects = value;
  if (section === 'services' && Array.isArray(value)) db.services = value;
  if (section === 'testimonials' && Array.isArray(value)) db.testimonials = value;
  if (section === 'media' && Array.isArray(value)) db.media = value;
  if (section === 'contacts' && Array.isArray(value)) db.contacts = value;
  if (section === 'notifications' && Array.isArray(value)) db.notifications = value;
  if ((section === 'users' || section === 'admins') && Array.isArray(value)) {
    const enrichedUsers = value.map((u: any) => {
      const existing = db.admins.find((a: any) => a.email === u.email || a.id === u.id);
      return {
        ...u,
        password_hash: u.password_hash || existing?.password_hash || bcrypt.hashSync('Adan12345', 10)
      };
    });
    db.admins = enrichedUsers;
    serverSiteData['admins'] = enrichedUsers;
    serverSiteData['users'] = enrichedUsers;
  }

  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(serverSiteData, null, 2), 'utf-8');
    console.log(`💾 [Local Storage] Section "${section}" updated instantly in site_data.json!`);
  } catch (e) {
    console.error(`⚠️ [Save Error on section "${section}"]:`, e);
  }
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

loadServerSiteData().catch(e => console.error("Initial load err:", e));

  // JSON payload up to 50mb for media data
  app.use(express.json({ limit: '50mb' }));

  // Serve uploaded files
  app.use('/uploads', express.static(UPLOADS_DIR, {
    maxAge: '7d',
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }));

  // ── Auth middleware ──
  const getAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ detail: "غير مصرح" });
    try {
      await loadServerSiteData();
      const token = authHeader.substring(7);
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const admin = db.admins.find(a => a.id === decoded.sub || a.email === decoded.email);
      if (!admin) return res.status(401).json({ detail: "المسؤول غير موجود" });
      (req as any).admin = admin;
      next();
    } catch (err) {
      return res.status(401).json({ detail: "رمز غير صالح" });
    }
  };

  const requireRole = (...roles) => (req, res, next) => {
    getAdmin(req, res, () => {
      if (!roles.includes((req as any).admin.role)) return res.status(403).json({ detail: "صلاحيات غير كافية" });
      next();
    });
  };

  // ═══════════════════════════════════════
  // ──  PUBLIC API ROUTES  ──
  // ═══════════════════════════════════════

  app.get("/api/", (req, res) => res.json({ message: "Adan Decor API", status: "running" }));

  // ── Site Data (full read/write) ──
  app.get("/api/site-data", async (req, res) => {
    await loadServerSiteData();
    if (serverSiteData && Object.keys(serverSiteData).length > 0) {
      return res.json(serverSiteData);
    }
    return res.json({ status: "empty" });
  });

  app.post("/api/site-data", (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid site data payload" });
    }
    saveServerSiteData(req.body);
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.put("/api/site-data", (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid site data payload" });
    }
    saveServerSiteData(req.body);
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  // ── Section-specific update endpoints (for the new admin panel) ──
  app.put("/api/site-data/projects", (req, res) => {
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected array" });
    updateSiteSection("projects", req.body);
    res.json({ ok: true, count: req.body.length });
  });

  app.put("/api/site-data/services", (req, res) => {
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected array" });
    updateSiteSection("services", req.body);
    res.json({ ok: true, count: req.body.length });
  });

  app.put("/api/site-data/testimonials", (req, res) => {
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected array" });
    updateSiteSection("testimonials", req.body);
    res.json({ ok: true, count: req.body.length });
  });

  app.put("/api/site-data/brand", (req, res) => {
    if (!req.body || typeof req.body !== "object") return res.status(400).json({ error: "Expected object" });
    updateSiteSection("brand", req.body);
    res.json({ ok: true });
  });

  app.put("/api/site-data/pageConfig", (req, res) => {
    if (!req.body || typeof req.body !== "object") return res.status(400).json({ error: "Expected object" });
    updateSiteSection("pageConfig", req.body);
    res.json({ ok: true });
  });

  app.put("/api/site-data/media", (req, res) => {
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected array" });
    updateSiteSection("media", req.body);
    res.json({ ok: true, count: req.body.length });
  });

  app.put("/api/site-data/users", (req, res) => {
    if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected array" });
    updateSiteSection("users", req.body);
    res.json({ ok: true, count: req.body.length });
  });

  // ── File Upload endpoint (Local Filesystem Storage) ──
  app.post("/api/upload", upload.single('file'), async (req: any, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    try {
      const url = `/uploads/${req.file.filename}`;
      res.json({
        ok: true,
        url,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      });
    } catch (err: any) {
      console.error("Upload handler exception:", err);
      res.status(500).json({ error: "Server upload error" });
    }
  });

  // ── Multi-file upload (Local Filesystem Storage) ──
  app.post("/api/upload/multiple", upload.array('files', 20), async (req: any, res) => {
    const files = req.files as any[];
    if (!files || files.length === 0) return res.status(400).json({ error: "No files uploaded" });
    try {
      const results = files.map((f: any) => ({
        url: `/uploads/${f.filename}`,
        filename: f.filename,
        originalName: f.originalname,
        size: f.size,
      }));
      res.json({ ok: true, files: results });
    } catch (err: any) {
      res.status(500).json({ error: "Multi-upload local error" });
    }
  });

  // ── Contact form ──
  app.post("/api/contact", (req, res) => {
    const { name, phone, project_type, budget, message } = req.body;
    if (!name?.trim() || !phone?.trim()) return res.status(400).json({ detail: "الاسم ورقم الهاتف مطلوبان" });
    const contact = {
      id: uuidv4(), name: name.trim(), phone: phone.trim(),
      project_type: project_type || "", budget: budget || "", message: message || "",
      is_read: false, created_at: new Date().toISOString()
    };
    db.contacts.push(contact);
    db.notifications.push({
      id: uuidv4(), kind: "contact", title: `رسالة جديدة من ${contact.name}`,
      body: (contact.message || "").substring(0, 200) || `${contact.phone} — ${contact.project_type || 'لا يوجد'}`,
      related_id: contact.id, is_read: false, delivered_externally: false, created_at: new Date().toISOString()
    });
    res.json(contact);
  });

  // Public data endpoints (read from site_data.json)
  app.get("/api/projects/public", (req, res) => {
    loadServerSiteData();
    const items = serverSiteData?.projects || [];
    res.json(items);
  });

  app.get("/api/services/public", (req, res) => {
    loadServerSiteData();
    res.json(serverSiteData?.services || []);
  });

  app.get("/api/testimonials/public", (req, res) => {
    loadServerSiteData();
    res.json(serverSiteData?.testimonials || []);
  });

  app.get("/api/settings/public", (req, res) => {
    const map = {};
    db.settings.forEach(s => map[s.key] = s.value);
    res.json(map);
  });

  // ═══════════════════════════════════════
  // ──  AUTH ROUTES  ──
  // ═══════════════════════════════════════

  app.post("/api/admin/login", async (req, res) => {
    await loadServerSiteData();
    const email = req.body.email?.toLowerCase().trim();
    const admin = db.admins.find((a: any) => a.email === email);
    if (!admin || !admin.password_hash || !req.body.password || !bcrypt.compareSync(req.body.password, admin.password_hash)) {
      return res.status(401).json({ detail: "بيانات الدخول غير صحيحة" });
    }
    const token = jwt.sign({ sub: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      access_token: token, token_type: "bearer",
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
    });
  });

  app.post("/api/login", async (req, res) => {
    await loadServerSiteData();
    const email = req.body.email?.toLowerCase().trim();
    const admin = db.admins.find((a: any) => a.email === email);
    if (!admin || !admin.password_hash || !req.body.password || !bcrypt.compareSync(req.body.password, admin.password_hash)) {
      return res.status(401).json({ detail: "بيانات الدخول غير صحيحة" });
    }
    const token = jwt.sign({ sub: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      access_token: token, token_type: "bearer",
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
    });
  });

  app.get("/api/admin/me", getAdmin, (req, res) => {
    const { password_hash, ...adminOut } = (req as any).admin;
    res.json(adminOut);
  });

  // ═══════════════════════════════════════
  // ──  ADMIN CRUD ROUTES  ──
  // ═══════════════════════════════════════

  app.get("/api/admin/messages", getAdmin, (req, res) => res.json([...db.contacts].sort((a,b) => b.created_at.localeCompare(a.created_at))));
  app.patch("/api/admin/messages/:id/read", getAdmin, (req, res) => {
    const msg = db.contacts.find(c => c.id === req.params.id);
    if (!msg) return res.status(404).json({ detail: "Not found" });
    msg.is_read = true;
    updateSiteSection('contacts', db.contacts);
    res.json({ ok: true });
  });
  app.delete("/api/admin/messages/:id", getAdmin, (req, res) => {
    db.contacts = db.contacts.filter(c => c.id !== req.params.id);
    updateSiteSection('contacts', db.contacts);
    res.json({ ok: true });
  });

  app.get("/api/admin/projects", getAdmin, (req, res) => res.json([...db.projects].sort((a,b) => a.order - b.order)));
  app.post("/api/admin/projects", getAdmin, (req, res) => {
    const p = { ...req.body, id: uuidv4(), created_at: new Date().toISOString() };
    db.projects.push(p);
    updateSiteSection('projects', db.projects);
    res.json(p);
  });
  app.put("/api/admin/projects/:id", getAdmin, (req, res) => {
    const i = db.projects.findIndex(p => p.id === req.params.id);
    if (i < 0) return res.status(404).json({ detail: "Not found" });
    db.projects[i] = { ...db.projects[i], ...req.body };
    updateSiteSection('projects', db.projects);
    res.json(db.projects[i]);
  });
  app.delete("/api/admin/projects/:id", getAdmin, (req, res) => {
    db.projects = db.projects.filter(p => p.id !== req.params.id);
    updateSiteSection('projects', db.projects);
    res.json({ ok: true });
  });

  app.get("/api/admin/services", getAdmin, (req, res) => res.json([...db.services].sort((a,b) => a.order - b.order)));
  app.post("/api/admin/services", requireRole('admin', 'editor'), (req, res) => {
    const s = { ...req.body, id: uuidv4() };
    db.services.push(s);
    updateSiteSection('services', db.services);
    res.json(s);
  });
  app.put("/api/admin/services/:id", requireRole('admin', 'editor'), (req, res) => {
    const i = db.services.findIndex(s => s.id === req.params.id);
    if (i < 0) return res.status(404).json({ detail: "Not found" });
    db.services[i] = { ...db.services[i], ...req.body };
    updateSiteSection('services', db.services);
    res.json(db.services[i]);
  });
  app.delete("/api/admin/services/:id", requireRole('admin', 'editor'), (req, res) => {
    db.services = db.services.filter(s => s.id !== req.params.id);
    updateSiteSection('services', db.services);
    res.json({ ok: true });
  });

  app.get("/api/admin/testimonials", getAdmin, (req, res) => res.json([...db.testimonials].sort((a,b) => a.order - b.order)));
  app.post("/api/admin/testimonials", requireRole('admin', 'editor'), (req, res) => {
    const t = { ...req.body, id: uuidv4() };
    db.testimonials.push(t);
    updateSiteSection('testimonials', db.testimonials);
    res.json(t);
  });
  app.put("/api/admin/testimonials/:id", requireRole('admin', 'editor'), (req, res) => {
    const i = db.testimonials.findIndex(t => t.id === req.params.id);
    if (i < 0) return res.status(404).json({ detail: "Not found" });
    db.testimonials[i] = { ...db.testimonials[i], ...req.body };
    updateSiteSection('testimonials', db.testimonials);
    res.json(db.testimonials[i]);
  });
  app.delete("/api/admin/testimonials/:id", requireRole('admin', 'editor'), (req, res) => {
    db.testimonials = db.testimonials.filter(t => t.id !== req.params.id);
    updateSiteSection('testimonials', db.testimonials);
    res.json({ ok: true });
  });

  app.get("/api/admin/settings", getAdmin, (req, res) => {
    const map = {};
    db.settings.forEach(s => map[s.key] = s.value);
    res.json(map);
  });
  app.put("/api/admin/settings", requireRole('admin', 'editor'), (req, res) => {
    Object.entries(req.body).forEach(([key, value]) => {
      const i = db.settings.findIndex(s => s.key === key);
      if (i >= 0) db.settings[i] = { key, value: String(value), updated_at: new Date().toISOString() };
      else db.settings.push({ key, value: String(value), updated_at: new Date().toISOString() });
    });
    updateSiteSection('settings', db.settings);
    res.json({ ok: true, count: Object.keys(req.body).length });
  });

  app.get("/api/admin/media", getAdmin, (req, res) => res.json([...db.media].sort((a,b) => b.uploaded_at.localeCompare(a.uploaded_at))));
  app.delete("/api/admin/media/:id", requireRole('admin', 'editor'), (req, res) => {
    db.media = db.media.filter(m => m.id !== req.params.id);
    updateSiteSection('media', db.media);
    res.json({ ok: true });
  });

  app.get("/api/admin/users", requireRole('admin'), (req, res) => {
    res.json(db.admins.map(({ password_hash, ...u }) => u));
  });
  app.post("/api/admin/users", requireRole('admin'), (req, res) => {
    const email = req.body.email.toLowerCase().trim();
    if (db.admins.find(a => a.email === email)) return res.status(400).json({ detail: "هذا البريد مسجّل مسبقاً" });
    const u = {
      id: uuidv4(), email, name: req.body.name || 'Admin', role: req.body.role,
      password_hash: bcrypt.hashSync(req.body.password, 10), created_at: new Date().toISOString()
    };
    db.admins.push(u);
    updateSiteSection('admins', db.admins);
    res.json({ id: u.id, email: u.email, name: u.name, role: u.role });
  });
  app.put("/api/admin/users/:uid", requireRole('admin'), (req, res) => {
    const i = db.admins.findIndex(a => a.id === req.params.uid);
    if (i < 0) return res.status(404).json({ detail: "Not found" });
    if (req.body.name) db.admins[i].name = req.body.name;
    if (req.body.role) db.admins[i].role = req.body.role;
    if (req.body.password && req.body.password.length >= 6) db.admins[i].password_hash = bcrypt.hashSync(req.body.password, 10);
    updateSiteSection('admins', db.admins);
    res.json({ ok: true });
  });
  app.delete("/api/admin/users/:uid", requireRole('admin'), (req, res) => {
    if ((req as any).admin.id === req.params.uid) return res.status(400).json({ detail: "لا يمكنك حذف حسابك" });
    db.admins = db.admins.filter(a => a.id !== req.params.uid);
    updateSiteSection('admins', db.admins);
    res.json({ ok: true });
  });

  app.get("/api/admin/stats", getAdmin, (req, res) => {
    res.json({
      total_messages: db.contacts.length,
      unread_messages: db.contacts.filter(c => !c.is_read).length,
      total_projects: db.projects.length,
      total_media: db.media.length,
      recent_messages: [...db.contacts].sort((a,b) => b.created_at.localeCompare(a.created_at)).slice(0, 5)
    });
  });

  app.get("/api/admin/notifications", getAdmin, (req, res) => res.json([...db.notifications].sort((a,b) => b.created_at.localeCompare(a.created_at))));
  app.patch("/api/admin/notifications/:id/read", getAdmin, (req, res) => {
    const n = db.notifications.find(x => x.id === req.params.id);
    if (!n) return res.status(404).json({ detail: "Not found" });
    n.is_read = true;
    updateSiteSection('notifications', db.notifications);
    res.json({ ok: true });
  });
  app.post("/api/admin/notifications/read-all", getAdmin, (req, res) => {
    db.notifications.forEach(n => n.is_read = true);
    updateSiteSection('notifications', db.notifications);
    res.json({ ok: true });
  });
  app.delete("/api/admin/notifications/:id", requireRole('admin', 'editor'), (req, res) => {
    db.notifications = db.notifications.filter(x => x.id !== req.params.id);
    updateSiteSection('notifications', db.notifications);
    res.json({ ok: true });
  });

  // Catch unhandled API routes
  app.all('/api/*', (req, res) => {
    res.status(501).json({ detail: "Not implemented" });
  });

  // ── Vite middleware for development ──
  if (process.env.NODE_ENV !== "production") {
    import("vite").then(({ createServer: createViteServer }) => {
      createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      }).then(vite => {
        app.use(vite.middlewares);
      });
    }).catch(err => console.error("Vite init error:", err));
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1y', setHeaders: (res, filePath) => { if (filePath.includes('/assets/')) { res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); } } }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Adan Decor Platform server running locally on port ${PORT}`);
  });

export default app;
