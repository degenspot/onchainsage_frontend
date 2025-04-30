"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from "lucide-react";

export default function BillingSettings() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Current Plan</h3>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Pro Plan</CardTitle>
                <CardDescription>$49/month, billed monthly</CardDescription>
              </div>
              <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Your next payment of $49.00 will be processed on May 15, 2023.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Advanced signal analysis
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Real-time market data
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Portfolio tracking
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Priority support
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Payment Method:</h4>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">Visa ending in 4242</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel Subscription</Button>
            <Button variant="outline">Update Payment Method</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Available Plans</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Basic Plan</CardTitle>
              <CardDescription>$19/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Basic signal analysis
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Delayed market data
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Limited portfolio tracking
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Downgrade
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Enterprise Plan</CardTitle>
              <CardDescription>$99/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Advanced signal analysis
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Real-time market data
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Unlimited portfolio tracking
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  24/7 dedicated support
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  API access
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Upgrade
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Billing History</h3>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 font-medium text-sm">
            <div>Date</div>
            <div>Description</div>
            <div>Amount</div>
            <div>Status</div>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 text-sm">
            <div>Apr 15, 2023</div>
            <div>Pro Plan - Monthly</div>
            <div>$49.00</div>
            <div>
              <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 text-sm">
            <div>Mar 15, 2023</div>
            <div>Pro Plan - Monthly</div>
            <div>$49.00</div>
            <div>
              <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4 text-sm">
            <div>Feb 15, 2023</div>
            <div>Pro Plan - Monthly</div>
            <div>$49.00</div>
            <div>
              <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
