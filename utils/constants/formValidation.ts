export const formValidation = {
    email: { required: 'Email không được để trống' },
    password: { required: 'Password không được để trống' },
    fullName: { required: 'Họ và tên không được để trống' },
    confirmPassword: (password: string) => ({
        required: 'Xác nhận mật khẩu không được để trống',
        validate: (value: string) =>
            value === password || 'Mật khẩu không khớp',
        maxLength: {
            value: 20,
            message: 'Mật khẩu không được dài hơn 20 ký tự',
        },
        minLength: {
            value: 6,
            message: 'Mật khẩu không được ít hơn 6 ký tự',
        },
    }),
    experiemceYears: { required: 'Số năm kinh nghiệm không được để trống' },
    technologies: { required: 'Công nghệ không được để trống' },
    bio: { required: 'Vị trí không được để trống' },
    date: { required: 'Ngày không được để trống' },
    from: { required: 'Giờ bắt đầu không được để trống' },
    to: { required: 'Giờ kết thúc không được để trống' },
    blogTitle: { required: 'Tiêu đề không được để trống' },
};
