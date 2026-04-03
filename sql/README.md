# sql/ — Tài liệu SQL tham khảo

Thư mục này chứa các file SQL tương đương với Prisma schema, dùng để:

- Đọc lại cấu trúc database một cách trực quan
- Tạo bảng thủ công nếu cần (không qua Prisma migrate)
- Backup / restore schema trong môi trường production

## Thứ tự chạy thủ công

```sql
\i sql/01_enums.sql
\i sql/02_users_subjects_grades_topics.sql
\i sql/03_questions.sql
\i sql/04_classes_permissions.sql
\i sql/05_exams.sql
\i sql/06_flashcards.sql
\i sql/07_seed.sql
```

## Lưu ý

- **Nguồn thật** là `prisma/schema.prisma`. Khi sửa schema, nhớ cập nhật cả file SQL tương ứng.
- File `07_seed.sql` chỉ nên chạy một lần khi khởi tạo môi trường mới.
- Đổi mật khẩu tài khoản admin ngay sau khi seed.
