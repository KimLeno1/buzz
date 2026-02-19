
import React, { useRef, useState } from 'react';
import { ProjectFile } from '../types';

declare const JSZip: any;

interface FileUploadProps {
  onFilesReady: (files: ProjectFile[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesReady }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setLoading(true);
    const files: ProjectFile[] = [];

    try {
      if (file.name.endsWith('.zip')) {
        const zip = await JSZip.loadAsync(file);
        const entries = Object.keys(zip.files);
        
        for (const filename of entries) {
          const zipFile = zip.files[filename];
          if (!zipFile.dir) {
            const content = await zipFile.async('string');
            files.push({
              name: filename.split('/').pop() || filename,
              path: filename,
              content,
              size: zipFile._data?.uncompressedSize || 0,
              type: filename.split('.').pop() || 'text'
            });
          }
        }
      } else {
        const content = await file.text();
        files.push({
          name: file.name,
          path: file.name,
          content,
          size: file.size,
          type: file.name.split('.').pop() || 'text'
        });
      }
      onFilesReady(files);
    } catch (err) {
      console.error(err);
      alert("Error parsing files.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-12 bg-white text-center">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Upload Project</h3>
      <p className="text-slate-500 mb-6">Support for .zip and source files</p>
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Browse Workspace'}
      </button>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
      />
    </div>
  );
};

export default FileUpload;
