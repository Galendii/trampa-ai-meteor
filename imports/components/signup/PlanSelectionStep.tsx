import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { ProductsCollection } from "/imports/api/subscriptions";
import { useWizard } from "/imports/contexts/WizardContext";
import { Meteor } from "meteor/meteor";
import { Product } from "/imports/models/subscriptions/product";
import { useToast } from "/imports/contexts/ToastContext";

// import { Container } from './styles';

const PlanSelectionStep: React.FC = () => {
  //   const products = useTracker(() => Meteor.subscribe("products.active"));
  const { formData, updateFormData } = useWizard();
  const [products, setProducts] = useState<Product[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    if (products.length === 0) {
      Meteor.call("products.all", (err, result) => {
        if (err) {
          addToast(err.message, `danger`);
          return;
        }
        setProducts(result);
      });
    }
  }, []);

  return (
    <div>
      <h1>Planos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <label>
              <input
                type="radio"
                name="plan"
                value={product._id}
                checked={formData.productId === product._id}
                onChange={(e) => updateFormData("productId", e.target.value)}
              />
              <strong>{product.name}</strong> - {product.description}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanSelectionStep;
