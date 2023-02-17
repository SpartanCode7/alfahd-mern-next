'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: '',
    description: ''
  });

  const [errors, setErrors] = useState({})
  const [data, setData] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const { name, slug, category, description } = form;
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!slug.trim()) errors.slug = 'Slug is required';
    if (!category.trim()) errors.category = 'Category is required';
    if (!description.trim()) errors.description = 'Description is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Submit form data
    const res = await fetch('http://localhost:8001/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.status === 200) {
      // Reset form fields
      setForm({
        name: '',
        slug: '',
        category: '',
        description: ''
      });
      setErrors({});
      setSuccessMessage('Data submitted successfully.');
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8001/categories')
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData()
  }, [])

  //Delete
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8001/categories/${id}`, {
      method: 'DELETE',
    });
  
    if (res.ok) {
      const newData = data.filter((category) => category.id !== id);
      setData(newData);
    }
  };

  return (
    <main className="categories">
      <h1>Categories</h1>
      <div className='categories__inner'>
        <div className='category__form box'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'form-control error' : 'form-control'}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug:</label>
              <input
                type="text"
                name="slug"
                id="slug"
                value={form.slug}
                onChange={handleChange}
                className={errors.slug ? 'form-control error' : 'form-control'}
              />
              {errors.slug && <p className="error-message">{errors.slug}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                className={errors.category ? 'form-control error' : 'form-control'}
              />
              {errors.category && <p className="error-message">{errors.category}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
                className={errors.description ? 'form-control error' : 'form-control'}
              />
              {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
        <div className='category__list box'>
          <div className="categories">
            <h1>Categories</h1>
              <div className='category__list'>
                {data && data.map((category) => (
                  <div key={category.id} className='category__item'>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <button onClick={() => handleDelete(category.id)}>Delete</button>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}

