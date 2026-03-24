import dbConnect from "@/lib/mongodb";
import Video from "@/lib/models/Video";
import { notFound } from "next/navigation";
import VideoEditForm from "@/components/admin/VideoEditForm";


interface EditVideoPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
    const { id } = await params;
    await dbConnect();
    const video: any = await Video.findById(id).lean();

    if (!video) {
        notFound();
    }

    const videoData = JSON.parse(JSON.stringify(video));

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <VideoEditForm video={videoData} />
        </div>
    );
}
