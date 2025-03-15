import { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import PropTypes from "prop-types";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
        const res = await fetch(videoDetailsUrl);
        const data = await res.json();
        if (data.items.length > 0) {
          setApiData(data.items[0]);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };
    fetchVideoData();
    window.scrollTo(0, 0);
  }, [videoId]);

  useEffect(() => {
    if (!apiData) return;
    const fetchOtherData = async () => {
      try {
        const channelLogoUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const channelRes = await fetch(channelLogoUrl);
        const channelData = await channelRes.json();
        if (channelData.items.length > 0) {
          setChannelData(channelData.items[0]);
        }

        const videoCommentUrl = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        const commentRes = await fetch(videoCommentUrl);
        const commentData = await commentRes.json();
        setCommentData(commentData.items || []);

        const userProfileUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const userProfileRes = await fetch(userProfileUrl);
        const userProfileData = await userProfileRes.json();
        if (userProfileData.items.length > 0) {
          setUserProfile(userProfileData.items[0]);
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };
    fetchOtherData();
  }, [apiData, videoId]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Loading..."}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "-"} Views
          • {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "-"}
        </p>
        <div>
          <span>
            <img src={like} alt="like" />{" "}
            {apiData ? value_converter(apiData.statistics.likeCount) : "-"}
          </span>
          <span>
            <img src={dislike} alt="dislike" /> 2
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        {channelData && (
          <img src={channelData.snippet.thumbnails.default.url} alt="Channel" />
        )}
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Unknown Channel"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "-"}{" "}
            Subscribers
          </span>
        </div>
        <button type="button">Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Loading description..."}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "0"}{" "}
          Comments
        </h4>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt="User"
            />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                <span>
                  {moment(
                    item.snippet.topLevelComment.snippet.publishedAt
                  ).fromNow()}
                </span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PlayVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default PlayVideo;
