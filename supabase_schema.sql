-- ====================================================================
-- سكريبت إنشاء الجدول السحابي الجديد في قاعدة بيانات Supabase (New DB)
-- انسخ هذا الكود بالكامل وضعه في محرر SQL (SQL Editor) في لوحة التحكم في حسابك الجديد في Supabase واضغط Run.
-- ====================================================================

CREATE TABLE IF NOT EXISTS adan_site_store (
  section TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- إعداد صلاحيات الأمان السريعة (RLS) للسماح للسيرفر بالقراءة والكتابة السريعة الفورية دون أي أخطاء أو تعليق
ALTER TABLE adan_site_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow complete access for server" ON adan_site_store
  FOR ALL USING (true) WITH CHECK (true);
