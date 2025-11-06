import { useState } from 'react';
import { MessageCircle, Heart, Share2, SendHorizonal, Filter, Search } from 'lucide-react';
import Button from '../../../commonComponents/buttons/Button';
import { Input } from '../../../commonComponents/forms/Input';

const initialPosts = [
  {
    id: 1,
    author: 'Emily Carter',
    initials: 'EC',
    timeAgo: '2h ago',
    title: 'Morning HIIT Session 🔥',
    body: 'Completed the HIIT routine shared by Coach Alex. Feeling energized and ready for the day! Anyone wants to partner for tomorrow?',
    tags: ['workout', 'hiit', 'motivation'],
    likes: 18,
    comments: 4,
  },
  {
    id: 2,
    author: 'Michael Lee',
    initials: 'ML',
    timeAgo: '5h ago',
    title: 'Healthy Meal Prep Ideas',
    body: 'Sharing my meal prep plan for this week with macros. Let me know if you have high-protein vegetarian options!',
    tags: ['nutrition', 'meal-prep'],
    likes: 24,
    comments: 7,
  },
  {
    id: 3,
    author: 'Sophia Brown',
    initials: 'SB',
    timeAgo: '1d ago',
    title: 'Stretch & Mobility Challenge',
    body: 'Starting a 14-day mobility challenge. Posting daily progress and tips. Join me if you want to improve flexibility! 🙌',
    tags: ['mobility', 'challenge'],
    likes: 32,
    comments: 12,
  },
];

const Community = () => {
  const [posts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
            <p className="text-gray-600 mt-1">
              Connect with fellow members, share progress, and stay motivated together.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:max-w-md">
            <Input
              placeholder="Search posts, tags, or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button>Start a Discussion</Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your progress, tips, or ask a question..."
          className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Tip:</span> Add hashtags like <span className="text-blue-600">#nutrition</span> or{' '}
            <span className="text-blue-600">#workout</span> to find posts faster.
          </div>
          <Button leftIcon={<SendHorizonal className="w-4 h-4" />} disabled={!newPost.trim()}>
            Post Update
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-lg">
                {post.initials}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">{post.author}</span>
                  <span>•</span>
                  <span>{post.timeAgo}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-1">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.body}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Heart className="w-4 h-4" /> {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-4 h-4" /> {post.comments} Comments
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10 text-center text-gray-600">
            No posts match your search. Try exploring different tags or topics.
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
