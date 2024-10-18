"use client"
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, Timestamp, orderBy, query } from 'firebase/firestore';
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

const ValerianCommentSection: React.FC<ValerianCommentSectionProps> = ({ valerianId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchComments();
  }, [valerianId]);

  const fetchComments = async () => {
    try {
      const commentsRef = collection(db, `valerians/${valerianId}/comments`);
      const q = query(commentsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedComments: Comment[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Comment, 'id'>
      }));
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
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

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Comments</h2>
      <form onSubmit={handleSubmitComment} className="mb-6">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 mb-2 bg-indigo-800 rounded text-white"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 mb-2 bg-indigo-800 rounded text-white"
          rows={3}
          required
        />
        <motion.button 
          type="submit" 
          className="bg-indigo-700 hover:bg-indigo-600 text-yellow-400 font-bold py-2 px-4 rounded transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Post Comment
        </motion.button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <motion.div 
            key={comment.id} 
            className="bg-indigo-800 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <p className="font-bold text-lg text-yellow-400">{comment.userName}</p>
              <p className="text-xs text-indigo-400">{formatDate(comment.createdAt)}</p>
            </div>
            <p className="mt-1 text-white">{comment.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ValerianCommentSection;