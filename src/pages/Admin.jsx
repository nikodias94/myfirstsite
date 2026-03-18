import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, Trash2, Edit, Plus, Download, Upload, Save, X,
    FileText, Feather, Globe, Star, BookText, LayoutDashboard,
    ChevronRight, CheckCircle, Home as HomeIcon, Image as ImageIcon, Link as LinkIcon, Share2 as ShareIcon, User
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Admin = () => {
    const { content, addItem, updateItem, deleteItem, updateHomepageSettings, importData } = useContent();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('poems');
    const [editingItem, setEditingItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const homeImageInputRef = useRef(null);
    const aboutImageInputRef = useRef(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingAboutImage, setUploadingAboutImage] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ title: '', content: '', date: '', path: '', order_index: 0, platform_name: '', url: '', icon_name: '' });
    
    // Homepage Settings State
    const [homeSettings, setHomeSettings] = useState({
        name: content.about?.name || '',
        bio: content.about?.bio || '',
        quote: content.about?.quote || '',
        heroImage: content.about?.heroImage || '',
        aboutTitle: content.about?.aboutTitle || '',
        aboutDescription: content.about?.aboutDescription || '',
        aboutImage: content.about?.aboutImage || '',
        aboutBio: content.about?.aboutBio || '',
        aboutQuote: content.about?.aboutQuote || '',
        contactEmail: content.about?.contactEmail || '',
        contactPhone: content.about?.contactPhone || '',
        contactAddress: content.about?.contactAddress || '',
        contactText: content.about?.contactText || '',
    });

    // Update local state when content loads
    React.useEffect(() => {
        if (content.about) {
            setHomeSettings({
                name: content.about.name || '',
                bio: content.about.bio || '',
                quote: content.about.quote || '',
                heroImage: content.about.heroImage || '',
                aboutTitle: content.about.aboutTitle || '',
                aboutDescription: content.about.aboutDescription || '',
                aboutImage: content.about.aboutImage || '',
                aboutBio: content.about.aboutBio || '',
                aboutQuote: content.about.aboutQuote || '',
                contactEmail: content.about.contactEmail || '',
                contactPhone: content.about.contactPhone || '',
                contactAddress: content.about.contactAddress || '',
                contactText: content.about.contactText || '',
            });
        }
    }, [content.about]);

    const categories = [
        { id: 'homepage', label: 'მთავარი გვერდი', icon: HomeIcon, color: '#f43f5e' },
        { id: 'navigation', label: 'ნავიგაცია', icon: LinkIcon, color: '#2dd4bf' },
        { id: 'socialLinks', label: 'სოციალური ქსელები', icon: ShareIcon, color: '#ec4899' },
        { id: 'poems', label: 'პოეზია', icon: Feather, color: '#c9a96e' },
        { id: 'poemsEn', label: 'Poems (En)', icon: Globe, color: '#60a5fa' },
        { id: 'translations', label: 'თარგმანი', icon: FileText, color: '#a78bfa' },
        { id: 'reviews', label: 'რეცენზია', icon: Star, color: '#fbbf24' },
        { id: 'prose', label: 'პოეზია', icon: BookText, color: '#4ade80' },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(content, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'site_backup.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const success = importData(e.target.result);
            if (success) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                alert('შეცდომა იმპორტის დროს!');
            }
        };
        reader.readAsText(file);
    };

    const openForm = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                content: item.content || '',
                date: item.date || new Date().toISOString().split('T')[0],
                path: item.path || '',
                order_index: item.order_index || 0,
                platform_name: item.platform_name || '',
                url: item.url || '',
                icon_name: item.icon_name || ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                content: '',
                date: new Date().toISOString().split('T')[0],
                path: '',
                order_index: 0,
                platform_name: '',
                url: '',
                icon_name: ''
            });
        }
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateItem(activeTab, editingItem.id, formData);
        } else {
            addItem(activeTab, formData);
        }
        setIsFormOpen(false);
        setEditingItem(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleHomeSettingsSubmit = async (e) => {
        e.preventDefault();
        const success = await updateHomepageSettings(homeSettings);
        if (success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            alert('შეცდომა შენახვისას');
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `hero_${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('homepage_assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('homepage_assets')
                .getPublicUrl(filePath);

            setHomeSettings(prev => ({ ...prev, heroImage: data.publicUrl }));
        } catch (error) {
            alert('ფოტოს ატვირთვა ვერ მოხერხდა: ' + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAboutImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadingAboutImage(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `about_${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('homepage_assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('homepage_assets')
                .getPublicUrl(filePath);

            setHomeSettings(prev => ({ ...prev, aboutImage: data.publicUrl }));
        } catch (error) {
            alert('ფოტოს ატვირთვა ვერ მოხერხდა: ' + error.message);
        } finally {
            setUploadingAboutImage(false);
        }
    };

    const currentCategory = categories.find(c => c.id === activeTab);
    const CurrentIcon = currentCategory?.icon || FileText;

    return (
        <div className="container admin-dashboard">
            {/* Success Notification */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="alert alert-success"
                        style={{
                            position: 'fixed',
                            top: '1rem',
                            right: '1rem',
                            zIndex: 1000,
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        <CheckCircle size={18} />
                        <span>ოპერაცია წარმატებით შესრულდა!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="admin-header"
            >
                <div className="flex items-center gap-4">
                    <div
                        className="flex items-center justify-center w-12 h-12 rounded-lg"
                        style={{
                            background: 'var(--accent-gold-dim)',
                            border: '1px solid var(--border-gold)'
                        }}
                    >
                        <LayoutDashboard size={24} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <div>
                        <h2 className="mb-0" style={{ fontSize: 'var(--text-2xl)' }}>მართვის პანელი</h2>
                        <p className="text-muted mb-0" style={{ fontSize: 'var(--text-sm)' }}>
                            საიტის კონტენტის მართვა
                        </p>
                    </div>
                </div>
                <div className="admin-actions">
                    <motion.button
                        onClick={handleExport}
                        className="btn btn-outline btn-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Download size={16} /> ექსპორტი
                    </motion.button>
                    <motion.button
                        onClick={() => fileInputRef.current.click()}
                        className="btn btn-outline btn-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Upload size={16} /> იმპორტი
                    </motion.button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImport}
                        className="hidden"
                        accept=".json"
                        style={{ display: 'none' }}
                    />
                    <motion.button
                        onClick={handleLogout}
                        className="btn btn-danger btn-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogOut size={16} /> გასვლა
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="admin-stats"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}
            >
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    // For homepage, we don't really have a 'count' of items, just pass 1 or 'Settings'
                    const count = cat.id === 'homepage' ? '⚙️' : (content[cat.id]?.length || 0);
                    return (
                        <motion.div
                            key={cat.id}
                            className="admin-stat-card"
                            whileHover={{ y: -2 }}
                            onClick={() => { setActiveTab(cat.id); setIsFormOpen(false); }}
                            style={{
                                cursor: 'pointer',
                                borderColor: activeTab === cat.id ? cat.color : undefined
                            }}
                        >
                            <Icon size={20} style={{ color: cat.color, marginBottom: '0.5rem' }} />
                            <div className="admin-stat-number" style={{ fontSize: cat.id === 'homepage' ? '1.5rem' : '2rem' }}>{count}</div>
                            <div className="admin-stat-label">{cat.label}</div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="tab-group"
            >
                {categories.map(cat => (
                    <motion.button
                        key={cat.id}
                        onClick={() => { setActiveTab(cat.id); setIsFormOpen(false); }}
                        className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <cat.icon size={16} style={{ marginRight: '0.5rem' }} />
                        {cat.label}
                    </motion.button>
                ))}
            </motion.div>

            {/* Content Area */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <CurrentIcon size={24} style={{ color: 'var(--accent-gold)' }} />
                        <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
                            {activeTab === 'homepage' ? 'მთავარი გვერდის პარამეტრები' : 
                             activeTab === 'pages' ? 'გვერდების რედაქტორი (ჩვენს შესახებ / კონטაქტი)' :
                             `${currentCategory?.label} - სია`}
                        </h3>
                        {activeTab !== 'homepage' && (
                            <span
                                className="badge"
                                style={{
                                    background: 'var(--accent-gold-dim)',
                                    color: 'var(--accent-gold)'
                                }}
                            >
                                {content[activeTab]?.length || 0}
                            </span>
                        )}
                    </div>
                    {activeTab !== 'homepage' && (
                        <motion.button
                            onClick={() => openForm()}
                            className="btn btn-primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Plus size={18} /> დამატება
                        </motion.button>
                    )}
                </div>

                {/* Homepage Settings - Clean Slate */}
                {activeTab === 'homepage' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="card mb-8"
                        style={{ border: '1px solid var(--accent-gold)', textAlign: 'center', padding: '4rem 2rem' }}
                    >
                        <HomeIcon size={48} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', opacity: 0.6 }} />
                        <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>მთავარი გვერდის მართვა</h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                            ეს სექცია ახლა ცარიელია. გვეტყვით რა ველები გჭირდებათ და ავაწყობთ!
                        </p>
                    </motion.div>
                )}

                {/* Input Form */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="card mb-8"
                            style={{ border: '1px solid var(--accent-gold)' }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h4 style={{ color: 'var(--accent-gold)', margin: 0 }}>
                                    {editingItem ? 'რედაქტირება' : 'ახლის დამატება'}
                                </h4>
                                <button
                                    onClick={() => setIsFormOpen(false)}
                                    className="btn-ghost"
                                    style={{ padding: '0.5rem' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {activeTab === 'navigation' ? (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">სათაური (დასახელება მენიუში)</label>
                                            <input
                                                type="text"
                                                placeholder="სათაური"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">ბმული (Path)</label>
                                            <input
                                                type="text"
                                                placeholder="მაგ: /poetry ან /about"
                                                value={formData.path}
                                                onChange={e => setFormData({ ...formData, path: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">მიმდევრობა (Order Index)</label>
                                            <input
                                                type="number"
                                                value={formData.order_index}
                                                onChange={e => setFormData({ ...formData, order_index: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </>
                                ) : activeTab === 'socialLinks' ? (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">პლატფორმის დასახელება</label>
                                            <input
                                                type="text"
                                                placeholder="მაგ: Facebook"
                                                value={formData.platform_name}
                                                onChange={e => setFormData({ ...formData, platform_name: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">ბმული (URL)</label>
                                            <input
                                                type="url"
                                                placeholder="https://facebook.com/..."
                                                value={formData.url}
                                                onChange={e => setFormData({ ...formData, url: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">აიქონის სახელი (Lucide React)</label>
                                            <input
                                                type="text"
                                                placeholder="მაგ: Facebook, Instagram, Twitter, Mail"
                                                value={formData.icon_name}
                                                onChange={e => setFormData({ ...formData, icon_name: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                            <p className="footer-subtext" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                                                იხილეთ <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>Lucide React</a> ხელმისაწვდომი ხატულებისთვის.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">სათაური</label>
                                            <input
                                                type="text"
                                                placeholder="შეიყვანეთ სათაური"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">ტექსტი</label>
                                            <textarea
                                                rows="10"
                                                placeholder="შეიყვანეთ ტექსტი"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                                className="form-textarea"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">თარიღი</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="flex gap-4">
                                    <motion.button
                                        type="submit"
                                        className="btn btn-primary"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Save size={18} /> შენახვა
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="btn btn-ghost"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        გაუქმება
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* List for Content Items */}
                {activeTab !== 'homepage' && (
                    <div className="flex flex-col gap-4">
                        {content[activeTab]?.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="admin-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="flex-1 min-w-0">
                                    <h4 style={{
                                        fontSize: 'var(--text-lg)',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {activeTab === 'socialLinks' ? item.platform_name : item.title}
                                    </h4>
                                    <p style={{
                                        fontSize: 'var(--text-sm)',
                                        color: 'var(--text-muted)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {activeTab === 'navigation' 
                                            ? `ბმული: ${item.path} | მიმდევრობა: ${item.order_index}`
                                            : activeTab === 'socialLinks'
                                                ? `ბმული: ${item.url} | აიქონი: ${item.icon_name}`
                                                : `${item.date} • ${item.content?.substring(0, 80) || ''}...`
                                        }
                                    </p>
                                </div>
                                <div className="item-actions">
                                    <motion.button
                                        onClick={() => openForm(item)}
                                        className="action-icon-btn btn-edit"
                                        title="რედაქტირება"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Edit size={18} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => {
                                            if (window.confirm('ნამდვილად გსურთ წაშლა?')) {
                                                deleteItem(activeTab, item.id);
                                                setShowSuccess(true);
                                                setTimeout(() => setShowSuccess(false), 3000);
                                            }
                                        }}
                                        className="action-icon-btn btn-delete"
                                        title="წაშლა"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Trash2 size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                        {content[activeTab]?.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="empty-state"
                                style={{ padding: '3rem 1rem' }}
                            >
                                <p className="text-muted italic">
                                    ამ კატეგორიაში ჩანაწერები არ არის. დაამატეთ პირველი!
                                </p>
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Admin;
