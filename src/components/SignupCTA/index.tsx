import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { RenderInClient } from 'components/RenderInClient'

/**
 * A signup CTA that directs to the correct region (EU or US) based on feature flag.
 */
export const SignupCTA = ({
    className = '',
    text = 'Get started - free',
    type = 'primary',
    width,
    event,
}: {
    text?: string
    className?: string
    type?: string
    width?: string
    event?: any
}): JSX.Element => {
    // const { posthog } = useValues(posthogAnalyticsLogic)

    return (
        <RenderInClient
            placeholder={
                <CallToAction
                    type={type}
                    className={className}
                    width={width}
                    to={`https://app.posthog.com/signup`}
                    event={event}
                >
                    {text}
                </CallToAction>
            }
        >
            <CallToAction
                type={type}
                className={className}
                width={width}
                to={`https://${
                    typeof window !== 'undefined' && window.posthog?.isFeatureEnabled('test-direct-to-eu-cloud')
                        ? 'eu'
                        : 'app'
                }.posthog.com/signup`}
                event={event}
            >
                {text}
            </CallToAction>
        </RenderInClient>
    )
}
