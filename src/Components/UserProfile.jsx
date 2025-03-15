import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../src/data";
import PropTypes from "prop-types";

const UserProfile = ({ sidebar }) => {
  const { channelId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playlistId, setPlaylistId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userProfileUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings,contentDetails&id=${channelId}&key=${API_KEY}`;
        const res = await fetch(userProfileUrl);
        const data = await res.json();

        if (data.items?.length > 0) {
          const channelData = data.items[0];
          setUserProfile(channelData);

          const uploadsPlaylistId =
            channelData?.contentDetails?.relatedPlaylists?.uploads;
          if (uploadsPlaylistId) {
            setPlaylistId(uploadsPlaylistId);
            fetchAllVideos(uploadsPlaylistId);
          }
        } else {
          console.error("No profile found for this channelId.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [channelId]);

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  const fetchAllVideos = async (playlistId, pageToken = "") => {
    setLoading(true);
    try {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&pageToken=${pageToken}&key=${API_KEY}`;
      const videoRes = await fetch(videoListUrl);
      const videoData = await videoRes.json();

      if (videoData.items) {
        setVideos((prevVideos) => [...prevVideos, ...videoData.items]);
      }

      setNextPageToken(videoData.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  return (
    <div
      className={`user-profile ${sidebar ? "sidebar-open" : "large-container"}`}
    >
      {loading ? (
        <p>Loading profile...</p>
      ) : userProfile ? (
        <div>
          {userProfile?.brandingSettings?.image?.bannerExternalUrl && (
            <img
              src={userProfile.brandingSettings.image.bannerExternalUrl}
              alt="Banner"
              className="profile-banner"
            />
          )}

          <img
            src={userProfile?.snippet?.thumbnails?.default?.url}
            alt="Profile"
            className="profile-image"
          />

          <h2>{userProfile?.snippet?.title}</h2>
          <p>{userProfile?.snippet?.description}</p>
          <div className="subscriber-info">
            <span>Subscribers: {userProfile?.statistics?.subscriberCount}</span>
            <span>Total Views: {userProfile?.statistics?.viewCount}</span>
            <span>Total Videos: {userProfile?.statistics?.videoCount}</span>
          </div>

          <button className="subscribe-btn" onClick={toggleSubscription}>
            {isSubscribed ? "Unfollow" : "Subscribe"}
          </button>

          <div className="videos">
            <h3>All Videos</h3>
            {videos.length > 0 ? (
              <ul>
                {videos.map((video, index) => (
                  <li key={`${video?.snippet?.resourceId?.videoId}-${index}`}>
                    <a
                      href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={video?.snippet?.thumbnails?.default?.url}
                        alt={video?.snippet?.title}
                        className="video-thumbnail"
                      />
                      <p>{video?.snippet?.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No videos found.</p>
            )}

            {nextPageToken && !loading && (
              <button
                className="load-more-btn"
                onClick={() => fetchAllVideos(playlistId, nextPageToken)}
              >
                Load More Videos
              </button>
            )}
            {loading && <p>Loading...</p>}
          </div>
        </div>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  sidebar: PropTypes.bool,
};

export default UserProfile;
