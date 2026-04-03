-- ============================================================
-- EduAssess — Bảng Flashcards
-- ============================================================

-- Bộ flashcard do giáo viên tạo cho lớp ôn tập
CREATE TABLE flashcard_sets (
    id            TEXT      PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title         TEXT      NOT NULL,
    subject_id    TEXT      NOT NULL REFERENCES subjects(id),
    class_id      TEXT      NOT NULL REFERENCES classes(id),
    created_by_id TEXT      NOT NULL REFERENCES users(id),
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Các câu hỏi trong bộ flashcard (kèm thứ tự)
CREATE TABLE flashcard_items (
    id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    set_id      TEXT NOT NULL REFERENCES flashcard_sets(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id),
    "order"     INT  NOT NULL
);

-- Phiên ôn tập flashcard của học sinh
CREATE TABLE flashcard_sessions (
    id           TEXT      PRIMARY KEY DEFAULT gen_random_uuid()::text,
    set_id       TEXT      NOT NULL REFERENCES flashcard_sets(id),
    student_id   TEXT      NOT NULL REFERENCES users(id),
    started_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP           -- NULL = chưa hoàn thành
);
