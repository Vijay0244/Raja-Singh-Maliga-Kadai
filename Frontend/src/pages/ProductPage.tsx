import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Trash2, History, Package } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { formatCurrency, formatDateTime, formatDate } from '../utils/dateUtils';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import Loading from '../components/Loading';

const ProductPage: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { product, deleteProduct, isDeletingProduct, fetchProductById, isFetchingEachProduct} = useProductStore()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    useEffect(() =>{
        if(id){
            fetchProductById(id)
        }
    }, [])

    const handleDelete = async() =>{
        if(product?._id){
            await deleteProduct(product._id)
            toast.success('பொருள் வெற்றிகரமாக நீக்கப்பட்டது!')
            navigate('/')
        }
    }

    if(isFetchingEachProduct){
        return (
            <Loading />
        )
    }

    if(!product){
        return (
            <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">பொருள் கிடைக்கவில்லை</h3>
                <p className="text-gray-600 mb-4">கோரப்பட்ட பொருள் கண்டுபிடிக்க முடியவில்லை.</p>
                <Button onClick={() => navigate('/products')}>பொருட்கள் பட்டியலுக்கு திரும்பு</Button>
            </div>
        )
    }

    const costPrice = typeof product.costPrice === 'object' ? parseFloat(product.costPrice.$numberDecimal) : product.costPrice
    const sellingPrice = typeof product.sellingPrice === 'object' ? parseFloat(product.sellingPrice.$numberDecimal) : product.sellingPrice
    const profit = sellingPrice - costPrice
    const profitPercentage = ((profit / costPrice) * 100).toFixed(1)
    const isLowStock = product.quantity < 10

    return (
        <div className="space-y-6 p-6">
            <div className="flex sm:flex-row flex-col sm:items-center gap-y-2 justify-between gap-x-2">
                <div className="flex items-center gap-x-2 sm:gap-4">
                    <Button variant="secondary" size="sm" onClick={() => navigate('/')} icon={ArrowLeft}></Button>
                    <h1 className="sm:text-2xl text-xl font-bold text-gray-900">{product.name}</h1>
                </div>
                
                <div className="flex items-center justify-end gap-2">
                    <Button size="sm" onClick={() => navigate(`/edit-product/${product._id}`)} icon={Edit}><span className='sm:block hidden'>மாற்று</span></Button>
                    <Button variant="danger" size="sm" onClick={() => setIsDeleteModalOpen(true)} icon={Trash2}><span className='sm:block hidden'>நீக்கு</span></Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">அடிப்படை தகவல்கள்</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">பொருளின் பெயர்</label>
                                <p className="text-lg font-semibold">{product.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">வகை</label>
                                <p className="text-lg">{product.category}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">அளவு</label>
                                <p className="text-lg">{product.unit}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">கையிருப்பு</label>
                                <p className={`text-lg font-semibold ${isLowStock ? 'text-red-600' : 'text-blue-600'}`}>{product.quantity}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">விலை தகவல்கள்</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">வாங்கும் விலை</label>
                                <p className="text-lg font-semibold text-red-600">{formatCurrency(costPrice)}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">விற்கும் விலை</label>
                                <p className="text-lg font-semibold text-green-600">{formatCurrency(sellingPrice)}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">லாபம்</label>
                                <p className={`text-lg font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(profit)}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">லாப விகிதம்</label>
                                <p className={`text-lg font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profitPercentage}%</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">நேர முத்திரைகள்</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">சேர்க்கப்பட்ட தேதி</label>
                            <p className="text-lg">{product.date ? formatDate(product.date) : 'N/A'}</p>
                        </div>
                        {product.createdAt && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">உருவாக்கப்பட்ட தேதி</label>
                                <p className="text-lg">{formatDateTime(product.createdAt)}</p>
                            </div>
                        )}
                        {product.updatedAt && (
                            <div>
                                <label className="text-sm font-medium text-gray-600">கடைசியாக மாற்றப்பட்ட தேதி</label>
                                <p className="text-lg">{formatDateTime(product.updatedAt)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {product.priceHistory && product.priceHistory.length > 0 && (
                <Card>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                            <History className="w-5 h-5" />
                            விலை வரலாறு ({product.priceHistory.length} entries)
                        </h3>
                        <div className="space-y-3">
                            {product.priceHistory.slice(0, 5).map((entry, index) => {
                                const entryCostPrice = typeof entry.costPrice === 'object' ? parseFloat(entry.costPrice.$numberDecimal) : entry.costPrice
                                const entrySellingPrice = typeof entry.sellingPrice === 'object' ? parseFloat(entry.sellingPrice.$numberDecimal) : entry.sellingPrice
                                const entryProfit = entrySellingPrice - entryCostPrice
                                const entryProfitPercentage = ((entryProfit / entryCostPrice) * 100).toFixed(1)
                                return (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm text-gray-600">{formatDateTime(entry.date)}</span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                #{product.priceHistory!.length - index}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="text-xs text-gray-500">வாங்கும் விலை</div>
                                                <div className="text-red-600 font-semibold">
                                                    {formatCurrency(entryCostPrice)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">விற்கும் விலை</div>
                                                <div className="text-green-600 font-semibold">
                                                    {formatCurrency(entrySellingPrice)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">லாபம்</div>
                                                <div className={`font-semibold ${entryProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {formatCurrency(entryProfit)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">லாப விகிதம்</div>
                                                <div className={`font-semibold ${entryProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {entryProfitPercentage}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {product.priceHistory.length > 5 && (
                                <p className="text-sm text-gray-500 text-center">
                                    மேலும் {product.priceHistory.length - 5} entries உள்ளன...
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            )}

            {isDeleteModalOpen &&  <DeleteConfirmModal isOpen={isDeleteModalOpen} product={product} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} isLoading={isDeletingProduct} />}
        </div>
    );
};

export default ProductPage;