import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import GovCard from '@/components/GovCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { demoTaxRecords } from '@/utils/demoData';
import { formatINR } from '@/utils/constants';
import {
  CreditCard,
  Receipt,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Printer,
  IndianRupee,
} from 'lucide-react';
import { toast } from 'sonner';

const TaxModule = () => {
  const [selectedTax, setSelectedTax] = useState<typeof demoTaxRecords[0] | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);

  const totalDue = demoTaxRecords.reduce((sum, t) => sum + t.totalDue, 0);
  const totalPaid = demoTaxRecords
    .filter((t) => t.status === 'paid')
    .reduce((sum, t) => sum + t.lastPaymentAmount, 0);

  const handlePayNow = (tax: typeof demoTaxRecords[0]) => {
    setSelectedTax(tax);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentConfirm = () => {
    toast.success('Payment initiated! Redirecting to payment gateway...');
    setIsPaymentDialogOpen(false);
    // In real app, redirect to payment gateway
  };

  const handleViewReceipt = (tax: typeof demoTaxRecords[0]) => {
    setSelectedTax(tax);
    setIsReceiptDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tax Payments</h1>
          <p className="text-muted-foreground">View and pay your land tax dues</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GovCard className="bg-destructive/10 border-destructive/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Due</p>
                <p className="text-2xl font-bold text-destructive">{formatINR(totalDue)}</p>
              </div>
            </div>
          </GovCard>

          <GovCard className="bg-accent/10 border-accent/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid (This FY)</p>
                <p className="text-2xl font-bold text-accent">{formatINR(totalPaid)}</p>
              </div>
            </div>
          </GovCard>

          <GovCard className="bg-primary/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Properties</p>
                <p className="text-2xl font-bold text-primary">{demoTaxRecords.length}</p>
              </div>
            </div>
          </GovCard>
        </div>

        {/* Tax Records */}
        <GovCard title="Tax Records" icon={<CreditCard className="w-5 h-5" />}>
          <div className="overflow-x-auto">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Survey No.</th>
                  <th>Village</th>
                  <th>Financial Year</th>
                  <th>Base Tax</th>
                  <th>Cess</th>
                  <th>Penalty</th>
                  <th>Total</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {demoTaxRecords.map((tax) => (
                  <tr key={tax.id}>
                    <td className="font-medium">{tax.surveyNumber}</td>
                    <td>{tax.village}</td>
                    <td>{tax.financialYear}</td>
                    <td>{formatINR(tax.baseTax)}</td>
                    <td>{formatINR(tax.cess)}</td>
                    <td className={tax.penalty > 0 ? 'text-destructive' : ''}>
                      {formatINR(tax.penalty)}
                    </td>
                    <td className="font-semibold">
                      {tax.status === 'paid'
                        ? formatINR(tax.lastPaymentAmount)
                        : formatINR(tax.totalDue)}
                    </td>
                    <td>{tax.dueDate}</td>
                    <td>
                      <Badge
                        variant={tax.status === 'paid' ? 'default' : 'destructive'}
                        className="capitalize"
                      >
                        {tax.status === 'paid' ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </Badge>
                    </td>
                    <td>
                      {tax.status === 'paid' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleViewReceipt(tax)}
                        >
                          <Receipt className="w-3 h-3" />
                          Receipt
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handlePayNow(tax)}
                        >
                          <CreditCard className="w-3 h-3" />
                          Pay Now
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GovCard>

        {/* Payment Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <GovCard title="Payment Methods">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Debit / Credit Card</p>
                  <p className="text-sm text-muted-foreground">Visa, MasterCard, RuPay</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <IndianRupee className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">UPI</p>
                  <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Receipt className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Net Banking</p>
                  <p className="text-sm text-muted-foreground">All major banks supported</p>
                </div>
              </div>
            </div>
          </GovCard>

          <GovCard title="Important Information">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Late payment will attract a penalty of 2% per month on the outstanding amount.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Payment receipts are available for download immediately after successful payment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Due date for current financial year: 31-03-2025
                </span>
              </li>
            </ul>
          </GovCard>
        </div>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
              <DialogDescription>
                Review the payment details before proceeding
              </DialogDescription>
            </DialogHeader>
            {selectedTax && (
              <div className="space-y-4 mt-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Survey Number</span>
                    <span className="font-medium">{selectedTax.surveyNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Village</span>
                    <span className="font-medium">{selectedTax.village}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Financial Year</span>
                    <span className="font-medium">{selectedTax.financialYear}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Tax</span>
                    <span>{formatINR(selectedTax.baseTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cess</span>
                    <span>{formatINR(selectedTax.cess)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Penalty</span>
                    <span className="text-destructive">{formatINR(selectedTax.penalty)}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">{formatINR(selectedTax.totalDue)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsPaymentDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 gap-2" onClick={handlePaymentConfirm}>
                    <CreditCard className="w-4 h-4" />
                    Pay {formatINR(selectedTax.totalDue)}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Receipt Dialog */}
        <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tax Payment Receipt</DialogTitle>
            </DialogHeader>
            {selectedTax && (
              <div className="space-y-4 mt-4">
                <div className="border border-border rounded-lg p-6">
                  {/* Receipt Header */}
                  <div className="text-center border-b border-border pb-4 mb-4">
                    <h3 className="font-bold text-lg">LAND REVENUE DEPARTMENT</h3>
                    <p className="text-sm text-muted-foreground">Government of India</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Receipt No: RCP-{selectedTax.id}-2024
                    </p>
                  </div>

                  {/* Receipt Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Survey Number</span>
                      <span className="font-medium">{selectedTax.surveyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Owner Name</span>
                      <span className="font-medium">{selectedTax.ownerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Village</span>
                      <span className="font-medium">{selectedTax.village}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Financial Year</span>
                      <span className="font-medium">{selectedTax.financialYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Date</span>
                      <span className="font-medium">{selectedTax.lastPaymentDate}</span>
                    </div>
                    <hr className="border-border my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Amount Paid</span>
                      <span className="text-accent">{formatINR(selectedTax.lastPaymentAmount)}</span>
                    </div>
                  </div>

                  {/* Receipt Footer */}
                  <div className="mt-6 pt-4 border-t border-dashed border-border text-center">
                    <p className="text-xs text-muted-foreground">
                      This is a computer-generated receipt. No signature required.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                  <Button className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default TaxModule;
