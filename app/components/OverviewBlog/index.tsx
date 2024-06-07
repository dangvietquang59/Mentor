function OverviewBlog() {
    return (
        <div className="flex items-center gap-[0.8rem]">
            <div className="w-[50%]">
                <h2 className="text-[5rem] font-bold">Summary of the</h2>
                <h2 className="text-[5rem] font-bold text-[#a0d911]">
                    Mentors system
                </h2>
                <div className="flex h-[45rem] w-full items-center justify-center rounded-[1rem] bg-[#eaff8f] p-[5rem]">
                    <p className="text-justify text-[1.8rem] font-medium leading-[3rem]">
                        A mentor helps you avoid mistakes they've made by
                        offering advice and sharing expertise amassed over their
                        career. Additionally, having a mentor is a deep and
                        reliable educational relationship in addition to being a
                        source of inspiration and guidance. Mentors can help you
                        access and learn about new chances because they
                        frequently have a wide network within their profession
                        or sector. They can also assist you in developing
                        previously unrealized skills and abilities. A mentor's
                        encouragement and support can help you become more
                        confident and ready to take on new tasks. A mentor can
                        also act as a reliable confidant when you need help
                        making big decisions in your life or profession. A
                        mentor can offer guidance while shaping and developing a
                        career plan.
                    </p>
                </div>
            </div>
            <picture className="w-[50%]">
                <img
                    src="https://edifice.io/app/uploads/2023/08/educative-scaled.webp"
                    alt="image"
                    className="h-[45rem] w-full rounded-[1rem] object-cover"
                />
            </picture>
        </div>
    );
}

export default OverviewBlog;
