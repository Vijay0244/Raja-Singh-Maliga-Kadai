import { Request, Response } from "express";
import mongoose from "mongoose";
import ProductModel from "../models/ProductModel";
import { validate } from "../utils/validate";
import { IProductDocument } from "../types/index";

export const addProductController = async(req: Request, res: Response) =>{
    try{
        const { name, category, unit, costPrice, sellingPrice, quantity } = req.body

        const result = validate(name, category, unit, costPrice, sellingPrice, quantity)
        if(!result.success){
            return res.status(400).json(result)
        }

        const newProduct: IProductDocument = new ProductModel({
            name: name,
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            quantity: quantity,
            unit: unit,
            category: category,
            priceHistory: [{
                costPrice: costPrice,
                sellingPrice: sellingPrice,
                date: new Date()
            }],
            date: new Date()
        })
        await newProduct.save()
        return res.status(200).json({success: true, message: 'Product created successfully', newProduct: newProduct})
    }
    catch(err: any){
        console.log(`Error in Add Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const getAllProductController = async(req: Request, res: Response) =>{
    try{
        const products = await ProductModel.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    costPrice: 1,
                    sellingPrice: 1,
                    quantity: 1,
                    unit: 1,
                    category: 1,
                    date: 1,
                    priceHistory: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])

        return res.status(200).json({success: true, products: products})
    }
    catch(err: any){
        console.log(`Error in Get All Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const getEachProductController = async(req: Request, res: Response) =>{
    try{
        const { id } = req.params

        if(!id){
            return res.status(400).json({success: false, error: 'Missing product ID'})
        } 

        const product = await ProductModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    costPrice: 1,
                    sellingPrice: 1,
                    quantity: 1,
                    date: 1,
                    unit: 1,
                    category: 1,
                    priceHistory: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])

        if(!product || product.length === 0){
            return res.status(404).json({success: false, error: 'Product not found'})
        }

        return res.status(200).json({success: true, product: product[0]})
    }
    catch(err: any){
        console.log(`Error in Get Each Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const editProductController = async(req: Request, res: Response) =>{
    try{
        const { id } = req.params
        const { name, category, unit, costPrice, sellingPrice, quantity } = req.body

        if(!id){
            return res.status(400).json({success: false, error: 'Missing product ID'})
        }

        const result = validate(name, category, unit, costPrice, sellingPrice, quantity)
        if(!result.success){
            return res.status(400).json(result)
        }

        const existingProduct = await ProductModel.findById(id)
        if(!existingProduct){
            return res.status(404).json({success: false, error: 'Product not found'})
        }

        const costChanged = existingProduct.costPrice.toString() !== costPrice.toString()
        const sellingChanged = existingProduct.sellingPrice.toString() !== sellingPrice.toString()

        const updateFields: any = {
            name: name,
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            quantity: quantity,
            unit: unit,
            category: category,
        }

        const updateOps: any = {
            $set: updateFields
        }

        if (costChanged || sellingChanged) {
            updateOps.$push = {
                priceHistory: {
                    costPrice: costPrice,
                    sellingPrice: sellingPrice,
                    date: new Date()
                }
            }
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateOps, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({success: true, message: 'Product updated successfully', updatedProduct: updatedProduct})
    }
    catch(err: any){
        console.log(`Error in Edit Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const deleteProductController = async(req: Request, res: Response) =>{
    try{
        const { id } = req.params

        if(!id){
            return res.status(400).json({success: false, error: 'Missing product ID'})
        } 
        
        const deleted = await ProductModel.findOneAndDelete(new mongoose.Types.ObjectId(id))
        if(!deleted){
            return res.status(404).json({success: false, error: 'Product not found or delete failed'})
        }

        return res.status(200).json({success: true, message: 'Product deleted successfully'})
    }
    catch(err: any){
        console.log(`Error in Delete Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}