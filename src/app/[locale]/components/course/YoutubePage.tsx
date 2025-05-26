"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/[locale]/components/ui/card";
import { Button } from "@/app/[locale]/components/ui/button";
import { Input } from "@/app/[locale]/components/ui/input";
import { Textarea } from "@/app/[locale]/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/[locale]/components/ui/tabs";
import { Badge } from "@/app/[locale]/components/ui/badge";
import { ScrollArea } from "@/app/[locale]/components/ui/scroll-area";
import { Separator } from "@/app/[locale]/components/ui/separator";
import {
  Download,
  MessageCircle,
  Video,
  FileText,
  ImageIcon,
  Users,
  Send,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/app/Services/api/axiosInstance";

interface VideoDownloadResponse {
  video_path: string;
  video_title: string;
  video_id: string;
}

interface TranscriptResponse {
  youtube_url: string;
  video_id: string;
  video_title: string;
  transcript: string;
}

interface ChannelVideosResponse {
  video_ids: string[];
  video_urls: string[];
  video_titles: string[];
}

interface ThumbnailResponse {
  thumbnail_path: string;
  video_id: string;
  thumbnail_url: string;
}

interface ChatMessageResponse {
  id: string;
  message: string;
  ai_response: string;
  created_at: string;
  user_id: string;
}

interface VideoData {
  id: string;
  video_id: string;
  title: string;
  thumbnail_url?: string;
  video_url: string;
  transcript: string;
  created_at: string;
}

interface YouTubeVideoListResponse {
  videos: VideoData[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

const apiCall = async (
  endpoint: string,
  method: "GET" | "POST",
  data?: any,
  params?: any
) => {
  try {
    const config: any = {
      method,
      url: `/api/v1/youtube${endpoint}`,
    };

    if (method === "POST" && data) {
      config.data = data;
    }

    if (method === "GET" && params) {
      config.params = params;
    }

    console.log("Making API call with config:", config);
    const response = await axiosInstance(config);
    console.log("API call successful:", response.status);
    return response.data;
  } catch (error: any) {
    console.error(`API call failed for ${endpoint}:`, {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw new Error(
      error.response?.data?.detail || error.message || "API call failed"
    );
  }
};

const downloadVideo = async (
  url: string,
  resolution: string
): Promise<VideoDownloadResponse> => {
  return apiCall("/download", "POST", { url, resolution });
};

const getTranscript = async (url: string): Promise<TranscriptResponse> => {
  return apiCall("/transcript", "POST", { url });
};

const getChannelVideos = async (
  channel_name: string
): Promise<ChannelVideosResponse> => {
  return apiCall("/channel", "POST", { channel_name });
};

const getThumbnail = async (url: string): Promise<ThumbnailResponse> => {
  return apiCall("/thumbnail", "POST", { url });
};

const sendChatMessage = async (
  message: string,
  video_id: string
): Promise<ChatMessageResponse> => {
  return apiCall("/chat", "POST", { message, video_id });
};

const getVideosList = async (
  page = 1,
  page_size = 10
): Promise<YouTubeVideoListResponse> => {
  return apiCall("/videos", "GET", null, { page, page_size });
};

export default function YouTubeProcessor() {
  const [activeTab, setActiveTab] = useState("download");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageResponse[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);
  const [pageSize] = useState(10);

  // Form states
  const [videoUrl, setVideoUrl] = useState("");
  const [resolution, setResolution] = useState("best");
  const [channelName, setChannelName] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  // Results states
  const [downloadResult, setDownloadResult] =
    useState<VideoDownloadResponse | null>(null);
  const [transcriptResult, setTranscriptResult] =
    useState<TranscriptResponse | null>(null);
  const [channelResult, setChannelResult] =
    useState<ChannelVideosResponse | null>(null);
  const [thumbnailResult, setThumbnailResult] =
    useState<ThumbnailResponse | null>(null);

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const loadVideos = async (page = 1) => {
    setLoading(true);
    try {
      const result = await getVideosList(page, pageSize);
      setVideos(result.videos);
      setCurrentPage(result.page);
      setTotalPages(result.total_pages);
      setTotalVideos(result.total);
    } catch (error: any) {
      toast({
        title: "Failed to Load Videos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!isValidYouTubeUrl(videoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await downloadVideo(videoUrl, resolution);
      setDownloadResult(result);
      toast({
        title: "Download Started",
        description: `Video "${result.video_title}" is being downloaded`,
      });
      // Refresh videos list
      await loadVideos(currentPage);
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTranscript = async () => {
    if (!isValidYouTubeUrl(videoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getTranscript(videoUrl);
      setTranscriptResult(result);
      toast({
        title: "Transcript Retrieved",
        description: `Transcript for "${result.video_title}" has been extracted`,
      });
      // Refresh videos list
      await loadVideos(currentPage);
    } catch (error: any) {
      toast({
        title: "Transcript Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChannelVideos = async () => {
    if (!channelName.trim()) {
      toast({
        title: "Invalid Channel",
        description: "Please enter a channel name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getChannelVideos(channelName);
      setChannelResult(result);
      toast({
        title: "Channel Videos Retrieved",
        description: `Found ${result.video_ids.length} videos`,
      });
    } catch (error: any) {
      toast({
        title: "Channel Fetch Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnail = async () => {
    if (!isValidYouTubeUrl(videoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await getThumbnail(videoUrl);
      setThumbnailResult(result);
      toast({
        title: "Thumbnail Retrieved",
        description: "Video thumbnail has been downloaded",
      });
      // Refresh videos list
      await loadVideos(currentPage);
    } catch (error: any) {
      toast({
        title: "Thumbnail Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatMessage.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (!selectedVideo) {
      toast({
        title: "No Video Selected",
        description: "Please select a video to chat about",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await sendChatMessage(chatMessage, selectedVideo.video_id);
      setChatMessages((prev) => [...prev, result]);
      setChatMessage("");
      toast({
        title: "Message Sent",
        description: "AI response generated",
      });
    } catch (error: any) {
      toast({
        title: "Chat Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    await loadVideos(page);
  };

  // Load videos on component mount
  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">YouTube Video Processor</h1>
        <p className="text-muted-foreground">
          Download videos, extract transcripts, get thumbnails, and chat with AI
          about video content
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="download" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </TabsTrigger>
          <TabsTrigger value="transcript" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="channel" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Channel
          </TabsTrigger>
          <TabsTrigger value="thumbnail" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Thumbnail
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="download" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Download YouTube Video</CardTitle>
              <CardDescription>
                Download a YouTube video with your preferred resolution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube URL</label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Resolution</label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best">Best Quality</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="360p">360p</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleDownload}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download Video
              </Button>

              {downloadResult && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Download Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Title:</strong> {downloadResult?.video_title}
                      </p>
                      <p>
                        <strong>Video ID:</strong> {downloadResult?.video_id}
                      </p>
                      <p>
                        <strong>Path:</strong> {downloadResult?.video_path}
                      </p>
                      <Badge variant="secondary">Download Complete</Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcript" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Extract Video Transcript</CardTitle>
              <CardDescription>
                Get the transcript/captions from a YouTube video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube URL</label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <Button
                onClick={handleTranscript}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                Extract Transcript
              </Button>

              {transcriptResult && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Transcript Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p>
                          <strong>Title:</strong>{" "}
                          {transcriptResult?.video_title}
                        </p>
                        <p>
                          <strong>Video ID:</strong>{" "}
                          {transcriptResult?.video_id}
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Transcript:</h4>
                        <ScrollArea className="h-40 w-full border rounded p-3">
                          <p className="text-sm">
                            {transcriptResult?.transcript}
                          </p>
                        </ScrollArea>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Channel Videos</CardTitle>
              <CardDescription>
                Retrieve a list of videos from a YouTube channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Channel Name</label>
                <Input
                  placeholder="Enter channel name or handle"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </div>
              <Button
                onClick={handleChannelVideos}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Users className="w-4 h-4 mr-2" />
                )}
                Get Channel Videos
              </Button>

              {channelResult && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Channel Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {channelResult?.video_titles.map(
                        (title: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded"
                          >
                            <div>
                              <p className="font-medium">{title}</p>
                              <p className="text-sm text-muted-foreground">
                                ID: {channelResult?.video_ids[index]}
                              </p>
                            </div>
                            <Badge variant="outline">Video {index + 1}</Badge>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thumbnail" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Video Thumbnail</CardTitle>
              <CardDescription>
                Download the thumbnail image from a YouTube video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube URL</label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <Button
                onClick={handleThumbnail}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <ImageIcon className="w-4 h-4 mr-2" />
                )}
                Get Thumbnail
              </Button>

              {thumbnailResult && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Thumbnail Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p>
                          <strong>Video ID:</strong> {thumbnailResult?.video_id}
                        </p>
                        <p>
                          <strong>Path:</strong>{" "}
                          {thumbnailResult?.thumbnail_path}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={
                            thumbnailResult?.thumbnail_url || "/placeholder.svg"
                          }
                          alt="Video thumbnail"
                          className="rounded border max-w-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Video</CardTitle>
                <CardDescription>Choose a video to chat about</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className={`p-3 border rounded cursor-pointer transition-colors ${
                        selectedVideo?.id === video.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {video.video_id}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Chat</CardTitle>
                <CardDescription>
                  {selectedVideo
                    ? `Chat about: ${selectedVideo.title}`
                    : "Select a video to start chatting"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-60 w-full border rounded p-3">
                  {chatMessages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No messages yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="space-y-2">
                          <div className="bg-primary/10 p-3 rounded">
                            <p className="text-sm">
                              <strong>You:</strong> {msg.message}
                            </p>
                          </div>
                          <div className="bg-muted p-3 rounded">
                            <p className="text-sm">
                              <strong>AI:</strong> {msg.ai_response}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask something about the video..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="min-h-[60px]"
                    disabled={!selectedVideo}
                  />
                  <Button
                    onClick={handleChat}
                    disabled={loading || !selectedVideo}
                    size="icon"
                    className="h-[60px]"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Stored Videos</CardTitle>
                <CardDescription>
                  Videos with transcripts available for AI chat
                </CardDescription>
              </div>
              <Button
                onClick={() => loadVideos(currentPage)}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : videos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No videos found</p>
                  <p className="text-sm">Upload some videos to get started</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {videos.map((video) => (
                      <Card key={video.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          {video.thumbnail_url ? (
                            <img
                              src={video.thumbnail_url || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Video className="w-12 h-12 text-muted-foreground" />
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2 line-clamp-2">
                            {video.title}
                          </h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>ID: {video.video_id}</p>
                            <p>
                              Created:{" "}
                              {new Date(video.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Badge variant="secondary">Has Transcript</Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedVideo(video);
                                setActiveTab("chat");
                              }}
                            >
                              Chat
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {videos.length} of {totalVideos} videos
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1 || loading}
                        >
                          Previous
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages || loading}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
