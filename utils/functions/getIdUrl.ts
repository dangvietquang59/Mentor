import { useParams } from 'next/navigation';

/**
 * Hàm để lấy id từ URL dựa vào router params.
 * @returns id từ URL hoặc undefined nếu không tìm thấy.
 */
export const useGetIdFromUrl = (): string | undefined => {
    const params = useParams();
    const id = params.id;

    // Kiểm tra nếu id tồn tại và trả về id, nếu không thì undefined
    if (typeof id === 'string') {
        return id;
    }

    return undefined;
};
