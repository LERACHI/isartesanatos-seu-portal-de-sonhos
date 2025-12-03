import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const categories = [
  { value: null, label: "Todos" },
  { value: "bebe", label: "Bebê" },
  { value: "junina", label: "Festa Junina" },
  { value: "tematico", label: "Temático" },
];

const sortOptions = [
  { value: "newest", label: "Mais Recentes" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
];

const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.label}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(cat.value)}
            className="rounded-full"
          >
            {cat.label}
          </Button>
        ))}
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilters;
