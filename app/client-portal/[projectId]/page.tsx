'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { Eye, EyeOff, Upload, CheckCircle, Palette, FileText, MessageSquare, Link, Lock } from 'lucide-react'

type ProjectInfo = {
    id: string
    name: string
    client: {
        businessName: string | null
        contactName: string | null
    }
    brandAsset: {
        id: string
        colorPalette: string | null
        businessContentUrl: string | null
        businessContentName: string | null
        googleDriveImagesUrl: string | null
        additionalComments: string | null
        isCompleted: boolean
    }
}

export default function ClientPortalPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = use(params)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [project, setProject] = useState<ProjectInfo | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        colorPalette: '',
        businessContentUrl: '',
        businessContentName: '',
        googleDriveImagesUrl: '',
        additionalComments: '',
        imagesUploaded: false,
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`/api/client-portal/${projectId}?password=${encodeURIComponent(password)}`)

            if (response.ok) {
                const data = await response.json()
                setProject(data)
                setFormData({
                    colorPalette: data.brandAsset.colorPalette || '',
                    businessContentUrl: data.brandAsset.businessContentUrl || '',
                    businessContentName: data.brandAsset.businessContentName || '',
                    googleDriveImagesUrl: data.brandAsset.googleDriveImagesUrl || '',
                    additionalComments: data.brandAsset.additionalComments || '',
                    imagesUploaded: false,
                })
                setIsAuthenticated(true)
                setSubmitted(data.brandAsset.isCompleted)
            } else {
                const errorData = await response.json()
                setError(errorData.error || 'Invalid password')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (file: File) => {
        setUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: uploadFormData,
            })

            if (response.ok) {
                const { url, fileName } = await response.json()
                setFormData(prev => ({
                    ...prev,
                    businessContentUrl: url,
                    businessContentName: fileName
                }))
            } else {
                alert('Failed to upload file')
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Failed to upload file')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation for required fields
        if (!formData.colorPalette.trim()) {
            alert('Please provide your brand colors information.')
            return
        }

        if (!formData.businessContentUrl) {
            alert('Please upload your business description document.')
            return
        }

        if (!formData.imagesUploaded) {
            alert('Please confirm that you have uploaded your media assets to the provided folder.')
            return
        }

        setSubmitting(true)

        try {
            const response = await fetch(`/api/client-portal/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    password
                }),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                const errorData = await response.json()
                alert(errorData.error || 'Failed to submit. Please try again.')
            }
        } catch (error) {
            alert('An error occurred. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const getClientName = () => {
        if (!project) return ''
        return project.client.businessName || project.client.contactName || 'Client'
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Brand Assets Portal</h1>
                        <p className="text-gray-600 mt-2">Enter the password provided by your project manager</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Access Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verifying...' : 'Access Portal'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            Need help? Contact your project manager for assistance.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Successfully Submitted!</h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for providing your brand assets. Your project manager will review the information and get in touch with you soon.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-800">
                            Project: <strong>{project?.name}</strong>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{project?.name}</h1>
                            <p className="text-gray-600">Brand Assets Collection for {getClientName()}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            Secure Portal
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h2 className="font-medium text-blue-900 mb-2">Welcome to Your Brand Assets Portal</h2>
                    <p className="text-sm text-blue-800">
                        Please provide the following information to help us create your perfect website. All fields are optional, but the more information you provide, the better we can serve you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Color Palette */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <Palette className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Color Palette <span className="text-red-500">*</span>
                            </h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand Colors (Required)
                            </label>
                            <textarea
                                value={formData.colorPalette}
                                onChange={(e) => setFormData({ ...formData, colorPalette: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Please describe your brand colors. You can include:&#10;• Hex codes (e.g., #FF5733, #33A1FF)&#10;• Color names (e.g., Navy blue, Warm orange)&#10;• Color preferences or mood (e.g., Professional, Modern, Vibrant)"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Help us understand your brand's color identity
                            </p>
                        </div>
                    </div>

                    {/* Business Content Document */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Business Content <span className="text-red-500">*</span>
                            </h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Description Document (Required)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleFileUpload(file)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={uploading}
                                required={!formData.businessContentUrl}
                            />
                            {uploading && (
                                <div className="text-sm text-blue-600 mt-2">Uploading...</div>
                            )}
                            {formData.businessContentUrl && (
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-sm text-green-600">✓ File uploaded:</span>
                                    <span className="text-sm text-gray-700">{formData.businessContentName}</span>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, businessContentUrl: '', businessContentName: '' }))}
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                            <div className="bg-blue-50 p-3 rounded-lg mt-3">
                                <p className="text-sm text-blue-800">
                                    <strong>Important:</strong> This document will be used to generate the texts for your website using AI technology. Please include detailed information about your business, services, target audience, and any specific messaging you'd like to convey.
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Upload a document with your business description, services, target audience, etc.
                            </p>
                        </div>
                    </div>

                    {/* Images & Media */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <Link className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Images & Media Assets <span className="text-red-500">*</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {project?.brandAsset.googleDriveImagesUrl ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Your Media Assets
                                    </label>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-sm text-green-800 mb-3">
                                            Please upload your logos, images, and other media assets to this shared folder:
                                        </p>
                                        <a
                                            href={project.brandAsset.googleDriveImagesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                        >
                                            <Link className="w-4 h-4" />
                                            <span>Open Upload Folder</span>
                                        </a>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="imagesUploaded"
                                                checked={formData.imagesUploaded}
                                                onChange={(e) => setFormData({ ...formData, imagesUploaded: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                required
                                            />
                                            <label htmlFor="imagesUploaded" className="ml-2 block text-sm text-gray-900">
                                                I have uploaded my media assets to the provided folder <span className="text-red-500">*</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-yellow-800">
                                        The upload folder link has not been set up yet. Please contact your project manager for the media upload instructions.
                                    </p>
                                </div>
                            )}
                            <p className="text-sm text-gray-500">
                                Include your logos, product images, team photos, and any other visual assets for your website
                            </p>
                        </div>
                    </div>

                    {/* Additional Comments */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <MessageSquare className="w-5 h-5 text-orange-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comments & Special Requests
                            </label>
                            <textarea
                                value={formData.additionalComments}
                                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Any additional information, special requests, or preferences you'd like us to know about..."
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Share any other details that will help us create your perfect website
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <button
                            type="submit"
                            disabled={submitting || uploading}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    <span>Submit Brand Assets</span>
                                </>
                            )}
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-3">
                            Once submitted, your project manager will review the information and contact you
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}