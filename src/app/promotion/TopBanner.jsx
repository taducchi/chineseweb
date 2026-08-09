
export default function TopBanner() {
        return (
                <div className="bg-primary text-white py-3 px-4 shadow-md "> 
                        <div className=" max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                                <p className="text-sm md:text-base font-medium">
                                        Luyện kĩ năng song hành với từ vựng, ngữ pháp và chữ Hán.
                                        <span className="font-bold">Ưu đãi 40% trọn đời - Chỉ trong tháng này!</span>
                                </p>
                                <a className="bg-white text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors shrink-0" href="#">
                                        Khám Phá Ngay
                                </a>
                        </div>
                </div>
        );      

                        
}