-- ============================================================
-- EduAssess — Bảng Questions (Ngân hàng câu hỏi)
-- ============================================================

-- Câu hỏi trắc nghiệm
-- Cột `options` lưu JSON dạng:
--   [
--     {"text": "Đáp án A", "isCorrect": false},
--     {"text": "Đáp án B", "isCorrect": true},
--     {"text": "Đáp án C", "isCorrect": false},
--     {"text": "Đáp án D", "isCorrect": false}
--   ]
CREATE TABLE questions (
    id            TEXT            PRIMARY KEY DEFAULT gen_random_uuid()::text,
    content       TEXT            NOT NULL,
    options       JSONB           NOT NULL,       -- 4 đáp án A/B/C/D + đánh dấu đúng/sai
    explanation   TEXT,                           -- Giải thích đáp án (tuỳ chọn)
    difficulty    "Difficulty"    NOT NULL,
    status        "QuestionStatus" NOT NULL DEFAULT 'PENDING',
    is_univ_exam  BOOLEAN         NOT NULL DEFAULT FALSE, -- TRUE = dùng ôn thi ĐH (khối 12)
    topic_id      TEXT            NOT NULL REFERENCES topics(id),
    subject_id    TEXT            NOT NULL REFERENCES subjects(id),
    created_by_id TEXT            NOT NULL REFERENCES users(id),
    created_at    TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- Index để lọc nhanh theo môn + độ khó + trạng thái
CREATE INDEX idx_questions_subject_difficulty ON questions (subject_id, difficulty);
CREATE INDEX idx_questions_status             ON questions (status);
CREATE INDEX idx_questions_topic              ON questions (topic_id);
