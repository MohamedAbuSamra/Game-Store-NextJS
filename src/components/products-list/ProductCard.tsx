import React, { useState } from "react";
import Link from "next/link";
import { Product } from "../../types";
import Button from "../base/Button";
import { purchaseProduct } from "../../api/products";
import BuyItemDialog from "../dialog/BuyItemDialog";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

// Set of game item emoji placeholders
const itemEmojis = ["🗡️", "🛡️", "🧪", "🎮", "🏹", "🪄", "🦾", "💎", "🧤", "🪙", "🧱", "🦴", "🧲", "🧵", "🧭", "🧰", "🧲", "🧨", "🧿", "🪓", "🪃"];

function getRandomEmoji(id: string | number) {
  // Use id to get a consistent emoji per product
  const idx = Math.abs(typeof id === 'string' ? id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : id) % itemEmojis.length;
  return itemEmojis[idx];
}

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const { incrementTransactionCount } = useAuthContext();
  const { showToast } = useToast();

  const displayTitle = product.title || product.name;
  // Use flagcdn.com for country flags, ISO code should be lowercase
  const flagUrl = product.country?.iso
    ? `https://flagcdn.com/24x18/${product.country.iso.toLowerCase()}.png`
    : null;
  const emoji = getRandomEmoji(product.id);

  // Place order and open transaction page
  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const transaction = await purchaseProduct(product.id);
      incrementTransactionCount();
      showToast("Purchase successful!", "success");
      router.push(`/transaction?id=${transaction.order_id}`);
      setOpen(false);
      setConfirm(false);
    } catch (e: any) {
      const msg = e?.response?.data?.message || "Failed to place order";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-secondary-900 rounded-xl shadow border border-primary-100 dark:border-primary-800 flex flex-col hover:shadow-2xl transition-shadow duration-150 group overflow-hidden hover:bg-primary-50 dark:hover:bg-primary-800">
        {/* Header with emoji and price */}
        <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-primary-200 via-primary-100 to-accent-100 dark:from-primary-900 dark:via-primary-800 dark:to-accent-900">
          <span className="text-4xl drop-shadow-sm">{emoji}</span>
          <span className="text-xl font-extrabold text-primary-700 dark:text-primary-200 bg-primary-100 dark:bg-primary-700 px-3 py-1 rounded-lg shadow-sm">
            ${product.price}
          </span>
        </div>
        {/* Country badge */}
        {product.country && (
          <div className="flex items-center gap-2 px-4 mt-3 mb-1">
            {flagUrl && (
              <img
                src={flagUrl}
                alt={product.country.name + ' flag'}
                className="inline-block w-5 h-4 rounded-sm border border-accent-300 dark:border-accent-600"
              />
            )}
            <span className="px-2 py-0.5 rounded-full bg-accent-100 dark:bg-accent-700 text-accent-700 dark:text-accent-100 text-xs font-bold border border-accent-300 dark:border-accent-600">
              {product.country.name}
            </span>
          </div>
        )}
        {/* Title and description */}
        <div className="flex-1 flex flex-col px-4 pb-4">
          <h3 className="text-lg font-bold mt-2 mb-1 group-hover:text-primary-600 transition-colors" title={displayTitle}>
            {displayTitle}
          </h3>
          <p className="text-secondary-700 dark:text-secondary-200 text-sm line-clamp-2 mb-4" title={product.description}>
            {product.description}
          </p>
          <div className="flex-1" />
          <Button
            variant="primary"
            onClick={() => setOpen(true)}
            aria-label="View Details"
            className="w-full py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 text-center mt-auto"
          >
            View Details
          </Button>
        </div>
      </div>
      {/* Dialog/Modal */}
      <BuyItemDialog
        open={open}
        onClose={() => { setOpen(false); setConfirm(false); }}
        product={product}
        error={error}
        confirm={confirm}
        setConfirm={setConfirm}
        loading={loading}
        handleBuy={handleBuy}
      />
    </>
  );
} 