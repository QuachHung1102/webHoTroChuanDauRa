-- ============================================================
-- EduAssess — Bảng Exams (Đề kiểm tra & Bài làm)
-- ============================================================

-- Đề kiểm tra do giáo viên tạo
CREATE TABLE exams (
    id            TEXT      PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title         TEXT      NOT NULL,
    subject_id    TEXT      NOT NULL REFERENCES subjects(id),
    class_id      TEXT      NOT NULL REFERENCES classes(id),
    created_by_id TEXT      NOT NULL REFERENCES users(id),
    duration      INT       NOT NULL,               -- Thời gian làm bài (phút)
    show_answer   BOOLEAN   NOT NULL DEFAULT TRUE,  -- Cho phép xem đáp án sau khi nộp
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Các câu hỏi trong đề (kèm thứ tự)
CREATE TABLE exam_questions (
    exam_id     TEXT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES questions(id),
    "order"     INT  NOT NULL,
    PRIMARY KEY (exam_id, question_id)
);

-- Lượt làm bài của học sinh
CREATE TABLE exam_attempts (
    id           TEXT      PRIMARY KEY DEFAULT gen_random_uuid()::text,
    exam_id      TEXT      NOT NULL REFERENCES exams(id),
    student_id   TEXT      NOT NULL REFERENCES users(id),
    started_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMP,           -- NULL = chưa nộp
    score        FLOAT                -- % điểm (0–100), NULL = chưa chấm
);

-- Đáp án từng câu của học sinh trong một lượt làm
CREATE TABLE exam_answers (
    id              TEXT    PRIMARY KEY DEFAULT gen_random_uuid()::text,
    attempt_id      TEXT    NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
    question_id     TEXT    NOT NULL REFERENCES questions(id),
    selected_option INT,              -- Index đáp án chọn (0–3), NULL = bỏ qua
    is_correct      BOOLEAN NOT NULL
);

-- Index để xem lại kết quả nhanh
CREATE INDEX idx_exam_attempts_student ON exam_attempts (student_id);
CREATE INDEX idx_exam_attempts_exam    ON exam_attempts (exam_id);
