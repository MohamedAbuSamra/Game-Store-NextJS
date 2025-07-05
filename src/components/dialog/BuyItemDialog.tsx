import React from "react";
import { Product } from "../../types";
import Button from "../base/Button";

interface BuyItemDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  error: string | null;
  confirm: boolean;
  setConfirm: (v: boolean) => void;
  loading: boolean;
  handleBuy: () => void;
}

const BuyItemDialog: React.FC<BuyItemDialogProps> = ({
  open,
  onClose,
  product,
  error,
  confirm,
  setConfirm,
  loading,
  handleBuy,
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;
  const displayTitle = product.title || product.name;
  const flagUrl = product.country?.iso
    ? `https://flagcdn.com/24x18/${product.country.iso.toLowerCase()}.png`
    : null;
  // Emoji logic (copied from ProductCard)
  const itemEmojis = ["🗡️", "🛡️", "🧪", "🎮", "🏹", "🪄", "🦾", "💎", "🧤", "🪙", "🧱", "🦴", "🧲", "🧵", "🧭", "🧰", "🧲", "🧨", "🧿", "🪓", "🪃"];
  function getRandomEmoji(id: string | number) {
    const idx = Math.abs(typeof id === 'string' ? id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : id) % itemEmojis.length;
    return itemEmojis[idx];
  }
  const emoji = getRandomEmoji(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`bg-white dark:bg-secondary-900 rounded-2xl shadow-lg p-10 w-full max-w-2xl relative border border-primary-200 dark:border-primary-700`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-3 right-3 text-2xl text-secondary-500 hover:text-primary-500"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-6 mb-6">
          <span className="text-6xl">{emoji}</span>
          <div>
            <h2 className="text-2xl font-bold mb-2">{displayTitle}</h2>
            <div className="text-primary-700 dark:text-primary-200 font-bold text-xl mb-1">${product.price}</div>
            {product.country && (
              <div className="flex items-center gap-2 mt-1">
                {flagUrl && <img src={flagUrl} alt={product.country.name + ' flag'} className="w-6 h-5 rounded-sm border" />}
                <span className="text-sm font-bold">{product.country.name}</span>
              </div>
            )}
            {"inventory" in product && (
              <div className="mt-2 text-secondary-700 dark:text-secondary-200 text-sm">
                <span className="font-semibold">Inventory:</span> {String(product["inventory"])}
              </div>
            )}
          </div>
        </div>
        <div className="mb-6 text-secondary-700 dark:text-secondary-200 text-lg">
          {product.description}
        </div>
        {error && <div className="text-error mb-4">{error}</div>}
        {/* Confirmation step */}
        {!confirm ? (
          <Button
            variant="primary"
            onClick={() => setConfirm(true)}
            className="w-full py-3 text-lg"
          >
            Buy
          </Button>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-center text-primary-700 dark:text-primary-200 font-semibold text-lg">
              Are you sure you want to buy <span className="font-bold">{displayTitle}</span> for <span className="font-bold">${product.price}</span>?
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                onClick={handleBuy}
                disabled={loading}
                className="px-8 py-2 text-lg"
              >
                {loading ? "Placing Order..." : "Confirm"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setConfirm(false)}
                className="px-8 py-2 text-lg"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyItemDialog; 