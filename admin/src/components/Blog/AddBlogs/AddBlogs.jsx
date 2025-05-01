import { useState } from 'react';
import { API_BASE_URL } from '../../../services/api';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: 'Admin',
    summary: '',
    tags: '',
    isPublished: false,
  });

  const [coverImage, setCoverImage] = useState(null); // File
  const [coverPreview, setCoverPreview] = useState(null); // For preview

  const [content, setContent] = useState([
    { type: 'heading', data: { text: '' } },
    { type: 'text', data: { text: '' } },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleContentChange = (index, field, value) => {
    const newContent = [...content];
    newContent[index].data[field] = value;
    setContent(newContent);
  };

  const handleContentImageChange = (index, file) => {
    const newContent = [...content];
    newContent[index].data.file = file;
    newContent[index].data.url = URL.createObjectURL(file);
    setContent(newContent);
  };

  const handleContentTypeChange = (index, newType) => {
    const newContent = [...content];
    newContent[index].type = newType;

    switch (newType) {
      case 'heading':
      case 'text':
      case 'paragraph':
      case 'quote':
      case 'tip':
      case 'code':
        newContent[index].data = { text: '' };
        break;
      case 'image':
      case 'embed':
        newContent[index].data = { url: '', caption: '' };
        break;
      case 'list':
        newContent[index].data = { items: [''] };
        break;
      default:
        newContent[index].data = {};
    }

    setContent(newContent);
  };

  const handleListChange = (index, itemIndex, value) => {
    const newContent = [...content];
    newContent[index].data.items[itemIndex] = value;
    setContent(newContent);
  };

  const addListItem = (index) => {
    const newContent = [...content];
    newContent[index].data.items.push('');
    setContent(newContent);
  };

  const addContentBlock = () => {
    setContent([...content, { type: 'paragraph', data: { text: '' } }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      content: [...content],
    };

    // Handle content images
    blogData.content.forEach((block, index) => {
      if (block.type === 'image' && block.data.file) {
        const fieldName = `contentImage_${index}`;
        form.append(fieldName, block.data.file);
        block.data.url = fieldName;
        delete block.data.file;
      }
    });

    // Attach cover image
    if (coverImage) {
      form.append('coverImage', coverImage);
    }

    // Append blog data as JSON string
    form.append('blogData', JSON.stringify(blogData));

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blogs`, {
        method: 'POST',
        body: form,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to create blog');

      alert('✅ Blog created successfully!');
    } catch (error) {
      console.error('❌ Blog creation failed:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" className="form-control mb-2" value={formData.title} onChange={handleInputChange} required />
        <input name="slug" placeholder="Slug" className="form-control mb-2" value={formData.slug} onChange={handleInputChange} required />

        <label className="form-label">Cover Image</label>
        <input type="file" accept="image/*" className="form-control mb-2" onChange={handleCoverImageChange} />
        {coverPreview && <img src={coverPreview} alt="Cover Preview" style={{ maxWidth: '100%', marginBottom: '10px' }} />}

        <textarea name="summary" placeholder="Summary" className="form-control mb-2" value={formData.summary} onChange={handleInputChange} />
        <input name="tags" placeholder="Tags (comma-separated)" className="form-control mb-2" value={formData.tags} onChange={handleInputChange} />
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="isPublished" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} />
          <label className="form-check-label" htmlFor="isPublished">Publish Now</label>
        </div>

        <h4>Content Blocks</h4>
        {content.map((block, index) => (
          <div key={index} className="border p-3 mb-3">
            <select className="form-select mb-2" value={block.type} onChange={(e) => handleContentTypeChange(index, e.target.value)}>
              <option value="heading">Heading</option>
              <option value="text">Text</option>
              <option value="paragraph">Paragraph</option>
              <option value="list">List</option>
              <option value="quote">Quote</option>
              <option value="code">Code</option>
              <option value="tip">Tip</option>
              <option value="image">Image</option>
              <option value="embed">Embed</option>
            </select>

            {block.type === 'list' ? (
              block.data.items.map((item, i) => (
                <input key={i} className="form-control mb-1" placeholder={`List item ${i + 1}`} value={item} onChange={(e) => handleListChange(index, i, e.target.value)} />
              ))
            ) : block.type === 'image' ? (
              <>
                <input type="file" accept="image/*" className="form-control mb-2" onChange={(e) => handleContentImageChange(index, e.target.files[0])} />
                {block.data.url && <img src={block.data.url} alt="Preview" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
                <input className="form-control" placeholder="Caption" value={block.data.caption || ''} onChange={(e) => handleContentChange(index, 'caption', e.target.value)} />
              </>
            ) : block.type === 'embed' ? (
              <>
                <input className="form-control mb-2" placeholder="Embed URL" value={block.data.url || ''} onChange={(e) => handleContentChange(index, 'url', e.target.value)} />
                <input className="form-control" placeholder="Caption" value={block.data.caption || ''} onChange={(e) => handleContentChange(index, 'caption', e.target.value)} />
              </>
            ) : (
              <textarea className="form-control" placeholder="Content" value={block.data.text} onChange={(e) => handleContentChange(index, 'text', e.target.value)} />
            )}

            {block.type === 'list' && (
              <button type="button" className="btn btn-sm btn-secondary mt-2" onClick={() => addListItem(index)}>
                ➕ Add List Item
              </button>
            )}
          </div>
        ))}

        <button type="button" className="btn btn-outline-primary mb-3" onClick={addContentBlock}>➕ Add Block</button>
        <br />
        <button type="submit" className="btn btn-success">🚀 Create Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;