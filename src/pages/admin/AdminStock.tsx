import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Minus, Plus, AlertTriangle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminProducts } from "@/hooks/useAdminProducts";

const AdminStock = () => {
  const { products, isLoading, updateStock } = useAdminProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState<number>(0);

  const handleStartEdit = (productId: string, currentStock: number) => {
    setEditingId(productId);
    setStockValue(currentStock);
  };

  const handleSave = (productId: string) => {
    updateStock.mutate({ id: productId, stock: stockValue });
    setEditingId(null);
  };

  const handleQuickAdjust = (productId: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    updateStock.mutate({ id: productId, stock: newStock });
  };

  const categoryLabels: Record<string, string> = {
    bebe: "Bebê",
    junina: "Festa Junina",
    tematico: "Temático",
  };

  const sortedProducts = [...products].sort((a, b) => a.stock - b.stock);

  return (
    <AdminLayout>
      <Helmet>
        <title>Estoque | Admin - Isartesanatos</title>
      </Helmet>

      <div className="space-y-6">
        <h1 className="font-display text-3xl font-semibold">Controle de Estoque</h1>

        {/* Low Stock Alert */}
        {products.filter(p => p.stock <= 5).length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Atenção: Produtos com estoque baixo</p>
              <p className="text-sm text-yellow-700">
                {products.filter(p => p.stock <= 5).length} produto(s) com 5 ou menos unidades
              </p>
            </div>
          </div>
        )}

        <div className="bg-card rounded-lg shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estoque Atual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">Ajustar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : sortedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum produto cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                sortedProducts.map((product) => (
                  <TableRow key={product.id} className={product.stock <= 5 ? "bg-yellow-50/50" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{categoryLabels[product.category]}</TableCell>
                    <TableCell>
                      {editingId === product.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            value={stockValue}
                            onChange={(e) => setStockValue(parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                          <Button size="sm" onClick={() => handleSave(product.id)}>
                            Salvar
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <span
                          className={`font-semibold cursor-pointer hover:text-primary ${
                            product.stock === 0 ? "text-destructive" : 
                            product.stock <= 5 ? "text-yellow-600" : ""
                          }`}
                          onClick={() => handleStartEdit(product.id, product.stock)}
                        >
                          {product.stock} unidades
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.stock === 0 ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                          Esgotado
                        </span>
                      ) : product.stock <= 5 ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Baixo
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          Normal
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleQuickAdjust(product.id, product.stock, -1)}
                          disabled={product.stock === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleQuickAdjust(product.id, product.stock, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleQuickAdjust(product.id, product.stock, 10)}
                        >
                          +10
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStock;
