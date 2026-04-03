import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">EduAssess</span>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Tính năng</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Cách hoạt động</a>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Dành cho giáo viên các môn Khoa học Tự nhiên
        </span>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Đánh giá chuẩn đầu ra
          <br />
          <span className="text-blue-600">chính xác & cá nhân hóa</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Xây dựng ngân hàng câu hỏi, tạo đề kiểm tra bằng AI, phân loại trình độ học sinh
          và giao bài tập phù hợp với từng cá nhân — tất cả trên một nền tảng.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Bắt đầu miễn phí
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tính năng chính</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏦",
                title: "Ngân hàng câu hỏi",
                desc: "Phân cấp theo môn, cấp học, khối lớp. Giáo viên tự soạn hoặc để AI gợi ý — mọi câu đều được review trước khi lưu.",
              },
              {
                icon: "🤖",
                title: "Tạo đề bằng AI",
                desc: "Chỉ cần chọn số câu, độ khó và thời gian. AI tự động tổng hợp đề và hiển thị thống kê thành phần câu hỏi.",
              },
              {
                icon: "📊",
                title: "Phân tích kết quả",
                desc: "Xem chi tiết từng học sinh sai câu nào, điểm yếu ở dạng bài nào. AI gợi ý nội dung cần ôn tập tiếp theo.",
              },
              {
                icon: "🃏",
                title: "Ôn tập Flashcard",
                desc: "Học sinh ôn luyện theo chủ đề với flashcard tương tác, giúp ghi nhớ kiến thức hiệu quả hơn.",
              },
              {
                icon: "🎯",
                title: "Phân hóa học sinh",
                desc: "Tự động phân loại trình độ dựa trên kết quả kiểm tra, làm cơ sở giao bài tập phù hợp từng cá nhân.",
              },
              {
                icon: "🔐",
                title: "Phân quyền rõ ràng",
                desc: "Admin phân quyền giáo viên theo môn và lớp. Giáo viên chỉ thấy lớp mình dạy. Học sinh quản lý tiến trình cá nhân.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Cách hoạt động</h2>
          <div className="space-y-8">
            {[
              { step: "01", role: "Giáo viên", action: "Xây dựng ngân hàng câu hỏi theo chủ đề, độ khó. AI hỗ trợ gợi ý và giáo viên approve từng câu." },
              { step: "02", role: "Giáo viên", action: "Tạo đề kiểm tra hoặc bộ flashcard từ ngân hàng câu hỏi, giao cho lớp học." },
              { step: "03", role: "Học sinh", action: "Làm bài kiểm tra hoặc ôn tập bằng flashcard. Xem lại đáp án và kết quả sau khi nộp bài." },
              { step: "04", role: "Hệ thống", action: "Phân tích kết quả, phân loại trình độ và gợi ý AI các điểm yếu cần cải thiện cho từng học sinh." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <span className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </span>
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.role}</span>
                  <p className="text-gray-700 mt-1">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng thử nghiệm?</h2>
          <p className="text-blue-100 mb-8">Đăng ký tài khoản và khám phá ngay hôm nay.</p>
          <Link
            href="/register"
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Đăng ký miễn phí
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © 2026 EduAssess. Công cụ hỗ trợ giáo viên đánh giá chuẩn đầu ra.
      </footer>
    </div>
  );
}
