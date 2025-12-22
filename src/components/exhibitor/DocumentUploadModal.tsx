import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyDocument } from '@/types/exhibitor';
import { Upload, FileText, Trash2, Plus } from 'lucide-react';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: CompanyDocument[];
  onSave: (documents: CompanyDocument[]) => void;
  title?: string;
}

const DOCUMENT_CATEGORIES = [
  { value: 'brochure', label: 'Brochure' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'white-paper', label: 'White Paper' },
  { value: 'press-release', label: 'Press Release' },
  { value: 'other', label: 'Other' },
];

export function DocumentUploadModal({
  isOpen,
  onClose,
  documents: initialDocuments,
  onSave,
  title = 'Upload Documents',
}: DocumentUploadModalProps) {
  const [documents, setDocuments] = useState<CompanyDocument[]>(initialDocuments);
  const [newDocument, setNewDocument] = useState<Partial<CompanyDocument>>({
    name: '',
    description: '',
    category: 'brochure',
  });

  const handleAddDocument = () => {
    if (!newDocument.name?.trim()) return;

    const doc: CompanyDocument = {
      id: `doc-${Date.now()}`,
      name: newDocument.name.trim(),
      description: newDocument.description?.trim() || '',
      category: (newDocument.category as CompanyDocument['category']) || 'other',
      fileUrl: '',
      fileName: 'document.pdf',
    };

    setDocuments([...documents, doc]);
    setNewDocument({ name: '', description: '', category: 'brochure' });
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(d => d.id !== docId));
  };

  const handleSave = () => {
    onSave(documents);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Existing Documents */}
          {documents.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Uploaded Documents</Label>
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                  <FileText className="h-8 w-8 text-primary shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{doc.description || 'No description'}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {DOCUMENT_CATEGORIES.find(c => c.value === doc.category)?.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDocument(doc.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Document Form */}
          <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
            <Label className="text-sm font-medium">Add New Document</Label>

            {/* PDF Upload */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">PDF File</Label>
              <div className="border rounded-lg p-4 text-center bg-muted/20">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground mb-2">
                  Drag and drop or click to upload PDF
                </p>
                <Button variant="outline" size="sm">
                  Choose PDF
                </Button>
              </div>
            </div>

            {/* Document Name */}
            <div className="space-y-2">
              <Label htmlFor="doc-name" className="text-xs text-muted-foreground">
                Document Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="doc-name"
                value={newDocument.name || ''}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                placeholder="e.g., Product Datasheet 2024"
              />
            </div>

            {/* Document Description */}
            <div className="space-y-2">
              <Label htmlFor="doc-description" className="text-xs text-muted-foreground">
                Description
              </Label>
              <Textarea
                id="doc-description"
                value={newDocument.description || ''}
                onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                placeholder="Brief description of the document content..."
                rows={2}
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Category</Label>
              <Select
                value={newDocument.category || 'brochure'}
                onValueChange={(v) => setNewDocument({ ...newDocument, category: v as CompanyDocument['category'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleAddDocument}
              disabled={!newDocument.name?.trim()}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
