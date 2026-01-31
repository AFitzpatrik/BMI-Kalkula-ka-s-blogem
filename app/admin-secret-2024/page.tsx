'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/lib/posts'
import RichTextEditor from '@/components/RichTextEditor'
import WorkoutManager from '@/components/WorkoutManager'

export default function AdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'posts' | 'workouts'>('workouts')

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin-secret-2024/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    // Ověřit, že je uživatel přihlášen
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify', {
          credentials: 'include', // Zajistit, že cookies jsou poslány
        })
        const data = await response.json()
        console.log('Auth check:', { ok: response.ok, valid: data.valid })
        
        if (!response.ok || !data.valid) {
          console.log('Auth failed, redirecting to login')
          window.location.href = '/admin-secret-2024/login'
          return
        }
        loadPosts()
      } catch (error) {
        console.error('Auth check error:', error)
        window.location.href = '/admin-secret-2024/login'
      }
    }
    checkAuth()
  }, [router])

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      showMessage('error', 'Chyba při načítání článků')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.excerpt || !formData.author) {
      showMessage('error', 'Všechna pole jsou povinná')
      return
    }

    try {
      if (editingPost) {
        const response = await fetch('/api/posts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id: editingPost.id, ...formData }),
        })

        const data = await response.json()
        
        if (response.ok) {
          showMessage('success', 'Článek byl úspěšně aktualizován')
          resetForm()
          await loadPosts()
        } else {
          showMessage('error', data.error || 'Chyba při aktualizaci článku')
          console.error('Update error:', data)
        }
      } else {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        })

        const data = await response.json()
        
        if (response.ok) {
          showMessage('success', 'Článek byl úspěšně vytvořen')
          resetForm()
          await loadPosts()
        } else {
          showMessage('error', data.error || 'Chyba při vytváření článku')
          console.error('Create error:', data)
        }
      }
    } catch (error) {
      showMessage('error', `Chyba při ukládání článku: ${error}`)
      console.error('Submit error:', error)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tento článek?')) return

    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('success', 'Článek byl úspěšně smazán')
        await loadPosts()
      } else {
        showMessage('error', data.error || 'Chyba při mazání článku')
        console.error('Delete error:', data)
      }
    } catch (error) {
      showMessage('error', `Chyba při mazání článku: ${error}`)
      console.error('Delete error:', error)
    }
  }

  const resetForm = () => {
    setFormData({ title: '', content: '', excerpt: '', author: '' })
    setEditingPost(null)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-5xl font-bold text-gray-900">
              CMS - Správa obsahu
            </h1>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Odhlásit se
            </button>
          </div>
          <p className="text-xl text-gray-600">
            Přidávejte a spravujte články a tréninky
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('workouts')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'workouts'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Tréninky
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Články
          </button>
        </div>

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <WorkoutManager />
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulář */}
            <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingPost ? 'Upravit článek' : 'Nový článek'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Název článku *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Autor *
                </label>
                <input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Krátký popis (excerpt) *
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="input-field"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Obsah článku * (Markdown formátování)
                </label>
                <div className="relative">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    placeholder="Začněte psát článek... Použijte tlačítka pro formátování nebo markdown syntax."
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Použijte tlačítka pro formátování nebo markdown syntax (**, *, #, -, &gt;, `, [text](url), ![alt](url))
                </p>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingPost ? 'Uložit změny' : 'Vytvořit článek'}
                </button>
                {editingPost && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    Zrušit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Seznam článků */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Seznam článků ({posts.length})
            </h2>
            {loading ? (
              <p className="text-gray-600">Načítání...</p>
            ) : posts.length === 0 ? (
              <p className="text-gray-600">Zatím nejsou žádné články.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-sm btn-secondary py-1 px-3"
                      >
                        Upravit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors"
                      >
                        Smazat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
