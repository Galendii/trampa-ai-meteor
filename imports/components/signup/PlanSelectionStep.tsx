import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Product } from "/imports/models/subscriptions/product";
import { useToast } from "/imports/contexts/ToastContext";
import Card from "../ui/Card";
import Button, { ButtonProps } from "../ui/Button";

// import { Container } from './styles';

const PlanSelectionStep: React.FC = () => {
  //   const products = useTracker(() => Meteor.subscribe("products.active"));
  // const { formData, updateFormData } = useWizard();
  const [products, setProducts] = useState<Product[]>([]);
  const { addToast } = useToast();
  const borderColors = ["border-primary", "border-secondary"];
  const textColors = ["text-primary", "text-secondary"];
  const buttonVariants: ButtonProps["variant"][] = ["default", "secondary"];
  console.log(products);
  useEffect(() => {
    if (products.length === 0) {
      Meteor.call("products.all", (err: Error, result: Product[]) => {
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
      <div className="flex justify-around items-center p-8 md:p-4">
        {products.map((product, index) => (
          <button className="hover:scale-105">
            <Card.Root
              borderColor={borderColors[index]}
              hoverColor={borderColors[index]}
              key={product._id}
            >
              <h3 className={`${textColors[index]} text-lg mb-2 font-bold`}>
                {product.name}
              </h3>
              <p>{product.description}</p>
              <p>
                Assine agora por apenas:
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.amount)}
              </p>
              <Button
                variant={
                  buttonVariants[index] as unknown as ButtonProps["variant"]
                }
                className="mt-5"
              >
                Assinar agora!
              </Button>
            </Card.Root>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanSelectionStep;
