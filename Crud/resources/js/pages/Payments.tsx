import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Payment, columns } from "@/components/payments/columns"
import { DataTable } from "@/components/payments/data-table"
import { useEffect, useState } from 'react';
import EditPaymentModal from "@/components/EditPaymentModal";
import AddPaymentModal from "@/components/EditPaymentModal";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

export default function Posts({payments} : {payments:Payment[]}) {
    const [data, setData] = useState<Payment[]>([payments]);
    const [editModelOpen, setEditModalOpen] = useState(false);
    const [isModalOpen,setIsModalOpen] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState<Payment| null>(null);



    useEffect(()=>{
        setData(payments);
    },[payments]);

    const handleUpdate = (updatedPayment:Payment) => {
        setData((prevData)=>
            prevData.map((payment)=> (payment.id === updatedPayment.id ? updatedPayment: payment))
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="container mx-auto py-10">
                <DataTable columns={columns(()=>{}, setEditModalOpen,setSelectedPayment)} data={payments} />
            </div>

            <EditPaymentModal isOpen={editModelOpen} onClose={()=> setEditModalOpen(false)}
                payment={selectedPayment}
                onUpdate={handleUpdate} />

            <AddPaymentModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}
                payment={selectedPayment}
                onUpdate={handleUpdate} />

      </AppLayout>
    )
  };


