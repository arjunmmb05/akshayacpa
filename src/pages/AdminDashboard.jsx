import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, Plus, Trash2, LogOut, MessageSquare, 
  Bell, Image as ImageIcon, Briefcase, LayoutGrid, Settings, Mail 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageInput from '../components/ImageInput';

const AdminDashboard = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data || {});
  const navigate = useNavigate();

  // If data arrives later from the API, update the form
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(data);
    }
  }, [data]);

  const handleSimpleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const addToArray = (field, defaultValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue]
    }));
  };

  const removeFromArray = (field, index) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const updateObjectInArray = (field, index, subfield, value) => {
    const newArr = [...formData[field]];
    newArr[index] = { ...newArr[index], [subfield]: value };
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const handleSave = () => {
    onSave(formData);
    alert('Site content updated successfully!');
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 p-8 font-outfit pb-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-[32px] border border-zinc-100 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-6">
            <img src="/akshayalogo.png" className="h-14" alt="Logo" />
            <div>
              <h1 className="text-3xl font-black tracking-tight text-primary-dark">Control Center</h1>
              <p className="text-primary font-bold uppercase text-[10px] tracking-widest mt-1">Digital Gateway Manager</p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={() => { sessionStorage.removeItem('akshaya_admin_auth'); navigate('/'); }} className="px-6 py-3 rounded-2xl text-zinc-500 font-bold hover:bg-zinc-100 hover:text-zinc-800 transition-all border border-zinc-200">
                <LogOut size={20} className="inline-block mr-2" /> Logout
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 md:flex-none bg-primary text-white px-10 py-3 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              <Save size={18} /> Publish Updates
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
             {/* Services Manager */}
             <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <Settings size={22} className="text-secondary" /> Service Management
                </h2>
                <div className="space-y-8">
                    {formData.services?.map((service, sIdx) => (
                        <div key={sIdx} className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 relative group">
                            <button 
                              onClick={() => removeFromArray('services', sIdx)}
                              className="absolute top-6 right-6 text-zinc-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full shadow-sm"
                            >
                              <Trash2 size={18} />
                            </button>
                            
                            <div className="space-y-5 mb-6 pr-10">
                              <input 
                                value={service.title}
                                onChange={(e) => updateObjectInArray('services', sIdx, 'title', e.target.value)}
                                className="w-full bg-transparent text-xl font-black text-primary-dark border-b border-zinc-200 pb-2 outline-none focus:border-primary transition-colors"
                                placeholder="Service Title"
                              />
                              <textarea 
                                value={service.description}
                                onChange={(e) => updateObjectInArray('services', sIdx, 'description', e.target.value)}
                                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-600 outline-none focus:border-primary transition-colors"
                                placeholder="Short description..."
                                rows={2}
                              />
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Icon Name:</span>
                                <input 
                                  value={service.icon}
                                  onChange={(e) => updateObjectInArray('services', sIdx, 'icon', e.target.value)}
                                  className="bg-white text-xs px-4 py-2 rounded-lg border border-zinc-200 font-medium text-zinc-700 outline-none focus:border-primary transition-colors"
                                  placeholder="e.g., shield, globe, zap"
                                />
                              </div>
                            </div>

                            <div className="space-y-3 bg-white p-5 rounded-2xl border border-zinc-100">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Required Documents</p>
                                {service.documents?.map((doc, dIdx) => (
                                    <div key={dIdx} className="flex gap-2">
                                        <input 
                                            value={doc}
                                            onChange={(e) => {
                                                const newDocs = [...service.documents];
                                                newDocs[dIdx] = e.target.value;
                                                updateObjectInArray('services', sIdx, 'documents', newDocs);
                                            }}
                                            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm text-zinc-700 outline-none focus:border-primary transition-colors"
                                        />
                                        <button onClick={() => {
                                            const newDocs = service.documents.filter((_, i) => i !== dIdx);
                                            updateObjectInArray('services', sIdx, 'documents', newDocs);
                                        }} className="text-zinc-400 hover:text-red-500 px-2"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newDocs = [...(service.documents || []), 'New Document'];
                                    updateObjectInArray('services', sIdx, 'documents', newDocs);
                                }} className="w-full py-2.5 border-2 border-dashed border-zinc-200 rounded-xl text-xs text-primary font-bold bg-zinc-50 hover:bg-zinc-100 hover:border-primary/30 transition-all">+ Add Document</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addToArray('services', { title: 'New Service', description: 'Describe service', icon: 'file-text', documents: [] })} className="w-full py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">+ Create New Service</button>
                </div>
             </section>

             {/* Gallery Manager */}
             <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <LayoutGrid size={22} className="text-secondary" /> Gallery Uploads
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.gallery?.map((img, index) => (
                        <div key={index} className="relative group bg-zinc-50 p-3 rounded-3xl border border-zinc-100">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-zinc-200 relative">
                              {img ? (
                                <img src={img} className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full text-zinc-400">No Image</div>
                              )}
                              <button onClick={() => removeFromArray('gallery', index)} className="absolute top-2 right-2 text-white bg-red-500/80 hover:bg-red-500 p-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                            </div>
                            <ImageInput value={img} onChange={(val) => handleArrayChange('gallery', index, val)} />
                        </div>
                    ))}
                    <button onClick={() => addToArray('gallery', '')} className="aspect-[3/4] border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center text-primary font-bold hover:bg-zinc-50 hover:border-primary/30 transition-all gap-2">
                      <Plus size={32} /> Add to Gallery
                    </button>
                </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Live News */}
            <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <ImageIcon size={22} className="text-secondary" /> Live News Posts
                </h2>
                <div className="space-y-6">
                    {formData.posts?.map((post, index) => (
                        <div key={index} className="bg-zinc-50 p-5 rounded-3xl border border-zinc-100 flex flex-col gap-4 group relative">
                            <button onClick={() => removeFromArray('posts', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 z-10"><Trash2 size={18} /></button>
                            <div className="flex gap-4 items-start pr-8">
                              <div className="w-20 h-20 rounded-2xl bg-zinc-200 overflow-hidden shrink-0">
                                {post.image && <img src={post.image} className="w-full h-full object-cover" />}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1 block">Post Image</span>
                                <ImageInput value={post.image} onChange={(val) => updateObjectInArray('posts', index, 'image', val)} />
                              </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addToArray('posts', { title: 'Update', image: '', createdAt: new Date().toISOString() })} className="w-full py-4 bg-zinc-100 text-primary font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all hover:bg-zinc-200">+ Publish New Story</button>
                </div>
            </section>

             {/* Brand Collaborators */}
             <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <Briefcase size={22} className="text-secondary" /> Brand Collaborators
                </h2>
                <div className="space-y-6">
                    {formData.brands?.map((brand, index) => (
                        <div key={index} className="bg-zinc-50 p-5 rounded-3xl border border-zinc-100 relative group">
                            <button onClick={() => removeFromArray('brands', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={18} /></button>
                            
                            <div className="flex flex-col gap-4 pr-8">
                              <input 
                                value={brand.name} 
                                onChange={(e) => updateObjectInArray('brands', index, 'name', e.target.value)} 
                                className="bg-white text-sm font-bold border border-zinc-200 px-4 py-3 rounded-xl outline-none focus:border-primary w-full" 
                                placeholder="Partner Name"
                              />
                              <div className="flex gap-4">
                                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-100 shrink-0">
                                  {brand.logo && <img src={brand.logo} className="w-full h-full object-contain" />}
                                </div>
                                <div className="flex-1">
                                  <ImageInput value={brand.logo} onChange={(val) => updateObjectInArray('brands', index, 'logo', val)} placeholder="Logo URL or Upload" />
                                </div>
                              </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addToArray('brands', { name: '', logo: '' })} className="w-full py-4 text-primary bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/50 transition-all">+ Add Collaborator</button>
                </div>
            </section>

             {/* Ticker Notifications */}
             <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <Bell size={22} className="text-secondary" /> Live Bulletins
                </h2>
                <div className="space-y-3">
                    {formData.notifications?.map((note, index) => (
                    <div key={index} className="flex gap-2">
                        <input value={note} onChange={(e) => handleArrayChange('notifications', index, e.target.value)} className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:border-primary" />
                        <button onClick={() => removeFromArray('notifications', index)} className="text-zinc-400 hover:text-red-500 px-2"><Trash2 size={20} /></button>
                    </div>
                    ))}
                    <button onClick={() => addToArray('notifications', '')} className="w-full py-3 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-xl text-xs text-primary font-bold hover:border-primary/50 transition-all">+ Broadcase New Bulletin</button>
                </div>
            </section>

             {/* User Reviews Manager */}
             <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <MessageSquare size={22} className="text-secondary" /> User Reviews Manager
                </h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.reviews?.length > 0 ? formData.reviews.map((review, index) => (
                        <div key={index} className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 relative group flex flex-col gap-2">
                            <button onClick={() => removeFromArray('reviews', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors z-10 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                            <div className="flex justify-between items-start pr-10">
                                <div>
                                    <span className="font-bold text-zinc-900">{review.name}</span>
                                    <div className="flex gap-1 text-sky-400 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                          <span key={i} className={i < review.rating ? "text-sky-400" : "text-zinc-300"}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-zinc-600 text-sm italic border-l-2 border-primary/20 pl-3 mt-2">{review.comment}</p>
                        </div>
                    )) : (
                        <div className="text-center py-6 text-zinc-400 font-medium">No reviews received yet.</div>
                    )}
                </div>
            </section>

             {/* Inquiry Inbox */}
             <section className="bg-white rounded-[32px] p-10 border border-zinc-100 shadow-xl shadow-zinc-200/20">
                <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-primary uppercase tracking-widest text-sm">
                    <Mail size={22} className="text-secondary" /> Citizen Inquiry Inbox
                </h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.inquiries?.length > 0 ? formData.inquiries.map((inquiry, index) => (
                        <div key={index} className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 relative group flex flex-col gap-2">
                            <button onClick={() => removeFromArray('inquiries', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors z-10 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                            <div className="flex justify-between items-start pr-10">
                                <div>
                                    <span className="font-bold text-zinc-900">{inquiry.name}</span>
                                    <span className="text-[10px] block text-zinc-400 font-black uppercase tracking-widest mt-0.5">{inquiry.email}</span>
                                    <span className="text-[9px] text-zinc-300 mt-1 block">{inquiry.date}</span>
                                </div>
                            </div>
                            <p className="text-zinc-600 text-sm border-l-2 border-primary/20 pl-3 mt-3">{inquiry.message}</p>
                        </div>
                    )) : (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-200">
                                <Mail size={32} />
                            </div>
                            <p className="text-zinc-400 font-bold">No inquiry messages yet.</p>
                        </div>
                    )}
                </div>
            </section>
          </div>



        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
