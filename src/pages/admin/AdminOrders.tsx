import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { Order, OrderStatus, orderStatusLabels, orderStatusColors } from "@/hooks/useOrders";

const AdminOrders = () => {
  const { orders, isLoading, updateOrderStatus } = useAdminOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus.mutate({ id: orderId, status });
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Pedidos | Admin - Isartesanatos</title>
      </Helmet>

      <div className="space-y-6">
        <h1 className="font-display text-3xl font-semibold">Pedidos</h1>

        <div className="bg-card rounded-lg shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      #{order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{order.shipping_city}, {order.shipping_state}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${orderStatusColors[order.status]}`}>
                              {orderStatusLabels[order.status]}
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(orderStatusLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${orderStatusColors[value as OrderStatus]}`}>
                                {label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => setSelectedOrder(order)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Pedido #{selectedOrder?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Informações do Pedido</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Data: {formatDate(selectedOrder.created_at)}</p>
                    <p>Status: <span className={`px-2 py-0.5 rounded-full text-xs ${orderStatusColors[selectedOrder.status]}`}>
                      {orderStatusLabels[selectedOrder.status]}
                    </span></p>
                    <p>Total: <span className="font-semibold text-foreground">{formatPrice(selectedOrder.total)}</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>{selectedOrder.shipping_address}</p>
                    <p>{selectedOrder.shipping_city}, {selectedOrder.shipping_state}</p>
                    <p>CEP: {selectedOrder.shipping_zip}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Observações</h3>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Itens do Pedido</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qtd: {item.quantity}
                          {item.size && ` • ${item.size}`}
                          {item.color && ` • ${item.color}`}
                        </p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.product_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
