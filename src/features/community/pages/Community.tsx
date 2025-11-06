import { useState } from 'react';
import { MessageSquare, Heart, Share2, Filter, Search } from 'lucide-react';
import { Input } from '../../../commonComponents/forms/Input';
import Button from '../../../commonComponents/buttons/Button';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    {
      id: 1,
      author: 'John Doe',
      avatar: 'JD',
      time: '2 hours ago',
      title: 'Best workout routine for beginners?',
      content: 'Looking for recommendations on a good starter workout routine. Any suggestions?',
      likes: 24,
      comments: 8,
      category: 'Fitness Tips',
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'JS',
      time: '5 hours ago',
      title: 'Nutrition advice needed',
      content: 'What are some good protein sources for vegetarians?',
      likes: 18,
      comments: 12,
      category: 'Nutrition',
    },
    {
      id: 3,
      author: 'Mike Johnson',
      avatar: 'MJ',
      time: '1 day ago',
      title: 'Yoga class was amazing!',
      content: 'Just finished my first yoga class and feeling great. Highly recommend!',
      likes: 32,
      comments: 5,
      category: 'Classes',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Community</h1>
            <p className="text-gray-600 mt-1">Connect with fellow gym members and share your fitness journey</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="w-5 h-5" />}>
            Filter
          </Button>
          <Button>New Post</Button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">{post.author}</span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">{post.time}</span>
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;

