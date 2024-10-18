"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, addDoc, getDocs, Timestamp, orderBy, query, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

interface Comment {
  id: string;
  text: string;
  userName: string;
  createdAt: Timestamp;
}

interface ValerianCommentSectionProps {
  valerianId: number;
}

const COMMENTS_PER_PAGE = 10;

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
  </div>
);

const ValerianCommentSection: React.FC<ValerianCommentSectionProps> = ({ valerianId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchComments(true);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    fetchComments();
  }, [valerianId]);

  const fetchComments = async (loadMore = false) => {
    if (isLoading || (!loadMore && comments.length > 0)) return;
    setIsLoading(true);
    try {
      const commentsRef = collection(db, `valerians/${valerianId}/comments`);
      let q = query(commentsRef, orderBy('createdAt', 'desc'), limit(COMMENTS_PER_PAGE));

      if (loadMore && lastVisible) {
        q = query(commentsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(COMMENTS_PER_PAGE));
      }

      const querySnapshot = await getDocs(q);
      const fetchedComments: Comment[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Comment, 'id'>
      }));

      setComments(prev => loadMore ? [...prev, ...fetchedComments] : fetchedComments);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(fetchedComments.length === COMMENTS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const commentData = {
        text: newComment,
        userName: userName,
        createdAt: Timestamp.now()
      };
      const commentsRef = collection(db, `valerians/${valerianId}/comments`);
      await addDoc(commentsRef, commentData);
      console.log('Comment added successfully');
      setNewComment('');
      setUserName('');
      fetchComments(); // Refresh comments after adding
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const formatRelativeTime = (timestamp: Timestamp) => {
    const now = new Date();
    const commentDate = timestamp.toDate();
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    if (diffInHours < 24) return `${diffInHours}hr ago`;
    if (diffInDays < 30) return `${diffInDays}d ago`;
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;
    return `${diffInYears}y ago`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-400">Comments</h2>
      <form onSubmit={handleSubmitComment} className="space-y-2 sm:space-y-3">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 bg-indigo-800 rounded text-white text-sm sm:text-base"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 bg-indigo-800 rounded text-white text-sm sm:text-base"
          rows={3}
          required
        />
       <div className="flex justify-end"> {/* New container for button alignment */}
          <motion.button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-600 text-yellow-400 font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </div>
      </form>
      <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            ref={index === comments.length - 1 ? lastCommentElementRef : null}
            className="bg-indigo-800 p-3 sm:p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2">
              <p className="font-bold text-base sm:text-lg text-yellow-400">{comment.userName}</p>
              <p className="text-xs text-indigo-400">{formatRelativeTime(comment.createdAt)}</p>
            </div>
            <p className="mt-1 text-sm sm:text-base text-white">{comment.text}</p>
          </motion.div>
        ))}
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default ValerianCommentSection;