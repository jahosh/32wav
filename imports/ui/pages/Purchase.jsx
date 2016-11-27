
import React from 'react';

export const Purchase = () => (
  <div>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
              <input type="hidden" name="business" value="mistahhick-facilitator@gmail.com" />


              <input type="hidden" name="cmd" value="_xclick" />


              <input type="hidden" name="item_name" value="Hot Track" />
              <input type="hidden" name="amount" value="1" />
              <input type="hidden" name="currency_code" value="USD" />


              <input type="image" name="submit" border="0"
              src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/blue-rect-paypal-26px.png"
              alt="Buy Now" />
              <img alt="" border="0" width="1" height="1"
              src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />

            </form>

            <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppppcmcvdam.png" alt="Pay with PayPal, PayPal Credit or any major credit card" />
  </div>
)