'use client';

export function NotesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Deep Learning Note */}
      <div className="cursor-pointer" onClick={() => window.open('https://www.notion.so/Deep-Learning-2e951d8d6c098023bae4e3a8d2907e3d?source=copy_link', '_blank')}>
        <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
          {/* Cover Image Section */}
          <div className="relative h-28 overflow-hidden">
            <img 
              src="/dl_notion.webp" 
              alt="Deep Learning Cover"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Description Section */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-3">Deep Learning</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Complete collection of deep learning concepts, architectures, and implementations. 
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Neural Networks</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">CNN</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">ANN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Python Note */}
      <div className="cursor-pointer" onClick={() => window.open('https://www.notion.so/Python-2eb51d8d6c09809b9f67cfeb30e1a8e4', '_blank')}>
        <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
          {/* Cover Image Section */}
          <div className="relative h-28 overflow-hidden">
            <img 
              src="/python_notion.webp" 
              alt="Python Programming Cover"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Description Section */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-3">Python Programming</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Comprehensive Python programming short notes covering basics to advanced topics. 
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Functions</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">OOPs</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Algorithms</span>
            </div>
          </div>
        </div>
      </div>

      {/* NLP */}
      <div className="cursor-pointer" onClick={() => window.open('https://www.notion.so/Python-https://www.notion.so/NLP-2f151d8d6c0980d5bacee05184720543', '_blank')}>
        <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
          {/* Cover Image Section */}
          <div className="relative h-28 overflow-hidden">
            <img 
              src="/nlp_notion.webp" 
              alt="NLP Cover"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Description Section */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-3">NLP</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Notes on Natural Language Processing and implementations.
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">NLP</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">RNNs</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Transformers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leetcode */}
      <div className="cursor-pointer" onClick={() => window.open('https://www.notion.so/leetcode-2ec51d8d6c09808cb9e3d86dc8d4365c', '_blank')}>
        <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
          {/* Cover Image Section */}
          <div className="relative h-28 overflow-hidden">
            <img 
              src="/lc_notion.webp" 
              alt="lc cover"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Description Section */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-3">Leetcode</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leetcode solutions understanding and explanations. 
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">DSA</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">cpp</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">math</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
