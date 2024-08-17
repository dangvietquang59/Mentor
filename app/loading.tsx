import { Spin } from 'antd';

function Loading() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Spin size="large" />
        </div>
    );
}

export default Loading;
