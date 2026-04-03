-- ============================================================
-- EduAssess — Seed Data (Dữ liệu khởi tạo)
-- Chạy sau khi đã tạo xong tất cả bảng
-- ============================================================

-- Môn học
INSERT INTO subjects (id, name) VALUES
    ('sub_toan',    'Toán'),
    ('sub_vatly',   'Vật lý'),
    ('sub_hoahoc',  'Hóa học'),
    ('sub_sinhhoc', 'Sinh học'),
    ('sub_tinhoc',  'Tin học')
ON CONFLICT DO NOTHING;

-- Khối lớp — Tiểu học
INSERT INTO grades (level, grade_number) VALUES
    ('PRIMARY', 1), ('PRIMARY', 2), ('PRIMARY', 3), ('PRIMARY', 4), ('PRIMARY', 5)
ON CONFLICT DO NOTHING;

-- Khối lớp — THCS
INSERT INTO grades (level, grade_number) VALUES
    ('MIDDLE', 6), ('MIDDLE', 7), ('MIDDLE', 8), ('MIDDLE', 9)
ON CONFLICT DO NOTHING;

-- Khối lớp — THPT
INSERT INTO grades (level, grade_number) VALUES
    ('HIGH', 10), ('HIGH', 11), ('HIGH', 12)
ON CONFLICT DO NOTHING;

-- Tài khoản Admin mặc định (đổi mật khẩu ngay sau khi deploy!)
-- password hash bên dưới = bcrypt("Admin@123456")
INSERT INTO users (id, name, email, password, role) VALUES
    ('user_admin', 'Admin', 'admin@eduassess.vn',
     '$2b$12$placeholder_hash_change_immediately', 'ADMIN')
ON CONFLICT DO NOTHING;
