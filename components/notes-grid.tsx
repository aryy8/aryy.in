'use client';

export function NotesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Deep Learning Note */}
      <div className="cursor-pointer" onClick={() => window.open('https://www.notion.so/Deep-Learning-2e951d8d6c098023bae4e3a8d2907e3d?source=copy_link', '_blank')}>
        <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
          {/* Cover Image Section */}
          <div className="relative h-32 overflow-hidden flex justify-center items-center">
            <img 
              src="/dl_notion.png" 
              alt="Deep Learning Cover"
              className="w-auto h-full object-contain"
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
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">RNN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Python Note */}
      <div className="cursor-pointer" onClick={() => window.open('https://www.notion.so/Python-Programming-YOUR-PYTHON-LINK', '_blank')}>
        <div className="bg-background rounded-lg border border-border/50 overflow-hidden shadow-sm hover:border-foreground/40 transition-all duration-300 hover:shadow-lg">
          {/* Cover Image Section */}
          <div className="relative h-32 overflow-hidden flex justify-center items-center">
            <img 
              src="/python_notion.png" 
              alt="Python Programming Cover"
              className="w-auto h-full object-contain"
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
    </div>
  );
}
