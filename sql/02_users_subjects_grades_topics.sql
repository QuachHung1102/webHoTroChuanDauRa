-- ============================================================
-- EduAssess — Bảng Users, Subjects, Grades, Topics
-- ============================================================

-- Người dùng hệ thống (Admin, Teacher, Student)
CREATE TABLE users (
    id          TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL UNIQUE,
    password    TEXT        NOT NULL,       -- bcrypt hash, KHÔNG lưu plain text
    role        "Role"      NOT NULL DEFAULT 'STUDENT',
    created_at  TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- Môn học (Toán, Vật lý, Hóa học, Sinh học...)
CREATE TABLE subjects (
    id   TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL UNIQUE
);

-- Khối lớp (1–12 kèm cấp học)
CREATE TABLE grades (
    id           TEXT         PRIMARY KEY DEFAULT gen_random_uuid()::text,
    level        "SchoolLevel" NOT NULL,
    grade_number INT          NOT NULL CHECK (grade_number BETWEEN 1 AND 12),
    UNIQUE (level, grade_number)
);

-- Chủ đề kiến thức (thuộc môn + khối)
-- VD: "Hàm số bậc hai" thuộc Toán lớp 10
CREATE TABLE topics (
    id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name       TEXT NOT NULL,
    subject_id TEXT NOT NULL REFERENCES subjects(id),
    grade_id   TEXT NOT NULL REFERENCES grades(id)
);
