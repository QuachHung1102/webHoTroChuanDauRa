-- ============================================================
-- EduAssess — Bảng Classes & Phân quyền
-- ============================================================

-- Lớp học (VD: 10A1, 11B2)
CREATE TABLE classes (
    id       TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name     TEXT NOT NULL,
    grade_id TEXT NOT NULL REFERENCES grades(id)
);

-- Phân quyền giáo viên: dạy môn nào ở lớp nào
-- Admin là người gán bản ghi này
CREATE TABLE teacher_classes (
    teacher_id TEXT NOT NULL REFERENCES users(id),
    class_id   TEXT NOT NULL REFERENCES classes(id),
    subject_id TEXT NOT NULL REFERENCES subjects(id),
    PRIMARY KEY (teacher_id, class_id, subject_id)
);

-- Học sinh thuộc lớp nào
CREATE TABLE student_classes (
    student_id TEXT NOT NULL REFERENCES users(id),
    class_id   TEXT NOT NULL REFERENCES classes(id),
    PRIMARY KEY (student_id, class_id)
);
