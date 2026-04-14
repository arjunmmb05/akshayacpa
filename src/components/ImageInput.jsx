import { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage } from '../lib/api';

const ImageInput = ({ value, onChange, placeholder = "Image URL or Upload" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState('url'); // 'url' or 'upload'
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      onChange(url);
      setMode('url'); // Switch back to see the URL
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
         fileInputRef.current.value = ""; // Reset input
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex bg-white/5 p-1 rounded-xl w-max">
        <button 
          onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'url' ? 'bg-white text-primary shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <LinkIcon size={14} /> URL
        </button>
        <button 
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'upload' ? 'bg-white text-primary shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <Upload size={14} /> Upload
        </button>
      </div>

      {mode === 'url' ? (
        <div className="relative">
          <input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-zinc-400" 
            placeholder={placeholder} 
          />
          <ImageIcon size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" />
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all bg-white text-zinc-500 group"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {isUploading ? (
            <>
              <Loader2 size={24} className="text-primary animate-spin" />
              <span className="text-sm font-medium text-primary">Uploading...</span>
            </>
          ) : (
             <>
               <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                  <Upload size={20} />
               </div>
               <div className="text-center">
                 <p className="text-sm font-bold text-zinc-700">Click to upload image</p>
                 <p className="text-xs text-zinc-400 mt-1">PNG, JPG, BMP up to 5MB</p>
               </div>
             </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
