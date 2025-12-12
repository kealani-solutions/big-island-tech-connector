import { useEffect, useRef } from 'react';

const MailerLiteForm = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger MailerLite to re-scan for forms after component mounts
    if (typeof window !== 'undefined' && (window as any).ml) {
      (window as any).ml('webforms', 'reload');
    }
  }, []);

  return (
    <div ref={formRef}>
      <div id="mlb2-34538115" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-34538115">
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
              <div className="ml-form-embedContent">
                <h4>Stay Updated</h4>
                <p><strong>Enter your email to get notified about our next event.</strong> <em>(We only send event announcements, typically one per month.)</em></p>
              </div>

              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/1978006/forms/173540738295923984/subscribe"
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent horozintalForm">
                  <div className="ml-form-horizontalRow">
                    <div className="ml-input-horizontal">
                      <div style={{ width: '100%' }} className="horizontal-fields">
                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          <input
                            type="email"
                            className="form-control"
                            data-inputmask=""
                            name="fields[email]"
                            placeholder="Email"
                            autoComplete="email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="ml-button-horizontal primary">
                      <button type="submit" className="primary">Subscribe</button>
                      <button disabled style={{ display: 'none' }} type="button" className="loading">
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                  </div>
                </div>

                <input type="hidden" name="ml-submit" value="1" />

                <div className="ml-mobileButton-horizontal">
                  <button type="submit" className="primary">Subscribe</button>
                  <button disabled style={{ display: 'none' }} type="button" className="loading">
                    <div className="ml-form-embedSubmitLoad"></div>
                    <span className="sr-only">Loading...</span>
                  </button>
                </div>

                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined our subscriber list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailerLiteForm;
