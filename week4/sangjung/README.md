Hey, I'm Helen.
안녕하세요. 저는 헬렌 입니다.

I'm a staff frontend developer at Shopify working on Hydrogen.
저는 Hydrogen 에서 일하고 있는 Shopify의 프론트엔드 개발자 입니다.

And today, I'll share how we're using React 18.
오늘 저는 어떻게 우리가 리액트 18을 사용하는지 말 할겁니다.

In the commerce landscape of today,
오늘날의 상업풍경에서,

brands need creative way to stand out in order to engage the buyer ?the second? they reached their storefront.
브랜드들은 구매자들이 사이트에 접속했을 때 그들을 끌어들이기 위해 눈에띄는 창의적인 방법이 필요하다
//브랜드는 매장에 도착했을 때 구매자를 끌어들이기 위해 눈에 띄는 창의적인 방법이 필요합니다.

At Shopify, we're seeing more merchant take an API first approach with Shopify's custom storefront platform to build their e-commerce site.
Shopify 에서, 우리는 더 많은 개발자가 먼저 Shopify의 API인 맞춤 사이트 플랫폼을 인터넷 상업 사이트를 만들기 위해 사용한다고 보고있다
//Shopify에서는 더 많은 상인들이 전자 상거래 사이트를 구축하기 위해 Shopify의 커스텀 스토어 프론트 플랫폼을 통해 API 우선 접근 방식을 취하고 있습니다.

They want more control of their stack so they can offer deeper personalization and a contextual buyer experience.
그들은 그들의 스택을 더 많이 제어하길 원한다 그래서 그들이 심층적인 개인화와 상황에 맞는 구매자 경험을 제공 할수있다
//고객은 보다 심층적인 개인 설정과 상황에 맞는 구매자 경험을 제공할 수 있도록 스택을 더 많이 제어하기를 원합니다.

While the platform approach provides flexibility, this often leads to difficult trail that can compromise on performance for developer experience, and both have a direct impact on conversions.
플랫폼이 유연한 접근을 제공하는 동안에, 이것은 종종 개발자 경험에 대한 성능을 저하시키는 어려운 길로 이끈다, 둘다 전환에 직접적인 영향을 미친다.
//플랫폼 접근 방식은 유연성을 제공하지만, 이는 종종 개발자 경험의 성능을 저하시킬 수 있는 어려운 추적으로 이어지고, 둘 다 전환에 직접적인 영향을 미칩니다.

For example, attempting to fix poor SEO when using client-side rendering.
예를 들어,  클라이언트 측 랜더링을 사용할 때 부족한 SEO를 수정하려고 시도하는 것이다.
//예를 들어, 클라이언트 측 렌더링을 사용할 때 불량한 SEO를 수정하려고 시도하는 것입니다.

This means writing two sets of code, one for server-side rendering and the other for client-side rendering.
이 뜻은 작성한다 두개의 코드 셋을, 하나는 서버측 랜더링을 그리고 다른 하나는 클라이언측 랜더링
//즉, 서버 측 렌더링과 클라이언트 측 렌더링의 두 가지 코드 세트를 작성하는 것을 의미합니다.

Another example might be attempting to localize your content, pricing and discounting.
또 다른 예로는 아마 너의 컨텐츠와 가격 그리고 할인을 현지화 하려 시도하는 것이다.
//또 다른 예로는 콘텐츠, 가격 및 할인을 현지화하려고 시도하는 것일 수 있습니다.

Like displaying in different currencies or showing different inventory counts by location.
마치 다른 통화로 표시하거나 지역마다 다른 재고수를 표시하는 것과 같다.
//다른 통화로 표시하거나 위치별로 다른 재고 수를 표시하는 것과 같습니다.

This often ended up with a huge client bundle that includes code that will never be used, if your buyer are in a certain geographical location.
이것은 만약 너의 구매자가 지리적 위치에 포함되어있다면 절대 사용되지 않을 코드들을 포함하고 있는 거대한 클라이언트 번들로 종종 종료되었다. 
//이것은 종종 구매자가 특정 지리적 위치에 있다면 절대 사용되지 않을 코드를 포함하는 거대한 클라이언트 번들로 귀결되었습니다.

Custom storefront developer know that getting into the leads of building out a storefront comes with a unique set of challenges.
커스텀 상점페이지 개발자 상점페이지를 구축하는데 있어서 독특한 과제가 뒤따른다는 것을 알고있다
//커스텀 스토어프론트 개발자는 스토어프론트를 구축하는 데 있어 독특한 과제가 뒤따른다는 것을 알고 있습니다.

For example, choosing a framework that fits best with building for commerce.
예를 들어, 상업 구축에 딱 맞는 프레임워크를 선택하는 것이다.
//예를 들어, 상거래를 위한 구축에 가장 적합한 프레임워크를 선택하는 것입니다.

A common approach is with server-side rendering, which can lead to good Largest Contentful Paint.
일반적인 접근은 서버사이드 랜더링 이다, 좋은 Largest Contentful Paint 이어질 수 있다.
//일반적인 방법은 서버 측 렌더링으로, 내용물이 가장 큰 그림판을 만들 수 있습니다.

Largest Contentful Paint or LCP is the rendering time of the largest image or text block visible within the viewport.
Largest Contentful Paint 또는 LCP는 랜더링 시간 가장 큰 이미지 또는 텍스트 블럭이 뷰포트내에 보이는 시간이다.
//최대 내용물 그림판 또는 LCP는 뷰포트 내에 표시되는 가장 큰 이미지 또는 텍스트 블록의 렌더링 시간입니다.

It is a performance metric that we care about for delivering the best buyer experience.
이것은 구매자에게 최고의 경험을 제공해주기위해 우리가 신경 쓰는 성능 지표이다
//이는 최상의 구매자 경험을 제공하기 위해 우리가 신경 쓰는 성과 지표입니다.

The generation of server-side rendering output can be bottleneck by the number of chain API requests that we need to make in order to render.
서버측 랜더링 출력 생성은 랜더링을 위해 우리가 필요해서 만든 요청된 체인 API 수에 따라 병목될 수 있다. 
//서버 측 렌더링 출력 생성은 렌더링에 필요한 체인 API 요청 수에 따라 병목 현상이 발생할 수 있습니다.

For example, making a query for product details and then making another query for other products in the same collection.
예를 들어, 제품의 자세한 정보를 조회하는 것이나 동일한 컬렉션에있는 다른 제품에 대해 조회하는 것이다.
//예를 들어, 제품 세부 정보를 조회한 다음 동일한 컬렉션에 있는 다른 제품에 대해 다른 조회를 하는 것입니다.

We evaluated this approach, and honestly, we don't want the rendering output to be bottleneck by chain API requests.
우리는 이 접근에 평가했다, 솔직히, 우리는 랜더링 출력이 체인 API요청에 의해 병목 현상이 발생하는 것을 원하지 않는다
//우리는 이 접근 방식을 평가했고, 솔직히 렌더링 출력이 체인 API 요청에 의해 병목 현상이 발생하는 것을 원하지 않습니다.

On top of that, we also don't like the large bundle that the client-side has to download in order to make the app interactive.
게다가, 우리는 또한 앱이 상호작용하기 위하여 클라이언트 사이드에서 다운로드해야하는 큰 번들을 좋아하지 않는다
//게다가, 우리는 또한 클라이언트 측이 앱을 대화식으로 만들기 위해 다운로드해야 하는 큰 번들을 좋아하지 않습니다.

Another common approach is with client-side rendering.
클라이언트 측 랜더링은 또 다른 일반적인 접근이다
//또 다른 일반적인 접근 방식은 클라이언트 측 렌더링입니다.

This can lead to slow LCP and a crappy buyer experience.
이것은 LCP를 느리게 하고 엉터리 사용자 경험을 이끈다. 
//이로 인해 LCP가 느려지고 구매자 경험이 엉망이 될 수 있습니다.

Not only that, it requires a large bundle downloaded on the client's side.
뿐만 아니라, 이것은 클라이언트 측에서 큰 번들 다운로드를 요구한다
//뿐만 아니라 클라이언트 측에서 대량의 번들을 다운로드해야 합니다.

It is simply not leveraging the server-side advantages such as faster Shopify storefront API and edge caching.
이것은 빠른 Shopify 상점페이지 API 그리고 edgt 캐싱과 같은 서버 측 이점을 활용하지 못한것이다.
//빠른 Shopify 스토어프론트 API 및 에지 캐싱과 같은 서버 측면의 이점을 활용하지 못하고 있습니다.

These come automatically with online store themes that client-side rendering can never benefit from.
이것들은 클라이언트 측 랜더링에 절대 혜택이 될 수 없는 온라인 상점 테마와 함께 자동적으로 온다.
//이들은 클라이언트 측 렌더링이 결코 이익을 얻을 수 없는 온라인 스토어 테마와 함께 자동으로 제공됩니다.

We want a good buyer experience and neither approach is cutting it for us.
우리는 좋은 사용자 경험 원하고 두개의 접근법은 우리에게서 잘라내는 것이다.
//우리는 좋은 구매자 경험을 원하며 두 가지 접근법 모두 우리에게 도움이 되지 않습니다.

This is why we build Hydrogen.
이것이 우리가 Hydrogen을 만드는 이유이다.
//이것이 우리가 수소를 만드는 이유입니다.

Hydrogen is a opinionated React-based framework for building custom storefronts on Shopify.
Hydrogen는 Shopify에서 커스텀 상점페이지를 구축하기위한 리엑트 기반의 독단적인 프레임워크 이다
//수소는 쇼피파이에 커스텀 스토어 프론트를 구축하기 위한 의견이 있는 리액트 기반 프레임워크입니다.

It is currently in developer preview, so it's not ready to support production storefronts just yet.
이것은 현재 개발자 미리보기 중이다. 그래서 아직 이것은 상점페이지 생산을 지원할 준비가 되지 않았다.
//현재 개발자 미리보기 중이므로 아직 생산 상점을 지원할 준비가 되지 않았습니다.

With Hydrogen, we want to help developer to get started on the right foot quickly, so you can build dynamic experiences without sacrificing performance.
Hydrogen을 사용한다면, 우리는 신속한 올바른 시작을 할 수 있게 개발자에게 도움이 되길 원한다. 그래서 너는 성능 희생 없이 동적인 경험을 구축 할수있다.
//Hydrogen을 사용하면 개발자가 신속하게 올바른 시작을 할 수 있도록 지원하여 성능을 희생하지 않고 역동적인 경험을 구축할 수 있습니다.

This is why we build it on top of React 18.
이것이 우리가 React 18을 기반으로 구축하는 이유이다.
//이것이 우리가 리액트 18 위에 그것을 짓는 이유입니다.

React Server Component are in Alpha and not ready for general use yet, but we're happy to be part of the React Server Component working group to help progress this work.
React Server Component는 Alpah 이며 아직 반적으로 사용될 준비가 되지 않았지만, 우리는 이 일을 진행하는데 도움이 되는 React Server Component 작업 그룹의 한 부분이 되서 행복하다.
//React Server Component는 Alpha 상태이며 아직 일반적으로 사용할 준비가 되지 않았지만, 이 작업을 진행하는 데 도움이 되는 React Server Component 작업 그룹의 일원이 되어 기쁩니다.

Hydrogen will provide a layer of abstraction to this.
Hydrogen는 이것에 추상화 층을 제공할 것이다.
//수소는 이것에 추상화 층을 제공할 것입니다.

Once version 1.0 is launched, Hydrogen will work out the box with React Server Component despite that evolving changes.
버전 1.0이 출시될때, Hydrogen는 진화하는 변화에도 불구하고 React Server Component  박스가 잘 작동될것이다.
//버전 1.0이 출시되면 Hydrogen은 진화하는 변화에도 불구하고 React Server Component로 상자를 해결할 것입니다.

There's still a ton of work to do, for example, server context is not finalized yet.
이것들은 여전히 할일이 1톤만큼 많다ㅋㅋ, 예를 들어, 서버 context 최종적로 확정되지 않았기 때문에
//예를 들어, 서버 컨텍스트가 아직 확정되지 않았기 때문에 아직 해야 할 일이 많습니다.

But we want to get this into the hands of the developer as soon as possible.
하지만 우리는 가능한 빨리 개발자가 이것을 손안에 가지길 원한다 
//하지만 우리는 이것을 가능한 한 빨리 개발자의 손에 넣기를 원합니다.

We're optimistic about the combination of React Server Components and streaming power by Suspense so that we can achieve the right level of dynamic, contextual and personalized commerce.
우리는 React Server Components와 Suspense의 스트리밍 기능의 조합을 통해 우리가 옳은 단계의 동적, 상황에 맞는 그리고 맞춤형 상업의 성취할 수 있을거에 대해 낙천적이다 
//Suspense의 React Server Components와 스트리밍 기능의 결합을 통해 적절한 수준의 동적, 상황에 맞는 맞춤형 커머스를 달성할 수 있을 것으로 낙관하고 있습니다.

Let me run through a couple of key features that we are super excited about.
우리가 매우 흥비로워하는 몇가지의 기능을 살펴보겠습니다.
//우리가 매우 기대하고 있는 몇 가지 주요 기능을 살펴보도록 하겠습니다.

React Server Components offer a new way to manage several inclined components.
React Server Components 는 몇몇의 비슷한 컴포넌트들을 새로운 방법으로 제공해준다
//반응형 서버 구성 요소는 몇 가지 기울어진 구성 요소를 관리할 수 있는 새로운 방법을 제공합니다.

With these server components, you can specify what can be stream with Suspense.
이러한 서버 components들은, 너는 Suspense로 스트리밍 할 수 있게 명시할수있다.
//이러한 서버 구성요소를 사용하여 Suspension으로 스트리밍할 수 있는 항목을 지정할 수 있습니다.

This means that the initial bundle that we needed to download in order to load the page is tiny.
이것은 우리가 페이지 로드를 하기 위해 다운로드해야하는 초기의 번들이 작다는 것을 뜻한다.
//이것은 페이지를 로드하기 위해 다운로드해야 했던 초기 번들이 작다는 것을 의미합니다.

In fact, about 100 kilobytes of downloaded JavaScript from the homepage of our Hydrogen started template.
사실, Hydrogen의 홈페이지에서 약 100킬로바이트의 자바스크립트를 다운로드하여 템플릿을 시작했다. 
//사실, Hydrogen의 홈페이지에서 약 100킬로바이트의 자바스크립트를 다운로드하여 템플릿을 시작했습니다.

This is nothing compared to the entire bundle of a typical single page app.
이것은 전형적인 싱글 페이지 앱의 전체 번들과 비교하면 아무것도 아니다
//이것은 일반적인 단일 페이지 앱의 전체 번들과 비교하면 아무것도 아닙니다.

We can get that fast First Contentful Paint that we want and enables progressive loading and feedback to buyer that the page is loading.
우리는 빠른 First Contentful Paint를 가질수있고, 페이지 로딩되고있는 사용자의 점진적인 로딩과 피드백을 원하고 가능하게 한다
//우리는 우리가 원하는 빠른 First Contentful 페인트를 얻을 수 있고, 페이지가 로딩되는 구매자에게 점진적인 로딩과 피드백을 가능하게 합니다.

Let's take a look at React Suspense in action.
React Suspense의 액션을 보겠다.
//React Suspension의 액션을 살펴보겠습니다.

One of the benefits of streaming with Suspense is that the server side no longer needs to wait for all API requests to complete before streaming.
Suspense를 활용한 스트리밍의 장점 중 하나는 서버측에서 스트리밍 전에 모든 API요청이 완료될때까지 더 긴 기다림이 필요하지 않다. 
//Suspense를 사용한 스트리밍의 이점 중 하나는 서버 측에서 스트리밍 전에 모든 API 요청이 완료될 때까지 기다릴 필요가 없다는 것입니다.

In this example, you'll notice a couple of loading sections streaming out of word.
이 예에서, 너는 두개의 로딩 섹션에서 단어가 스트리밍된다는 것을 알아차릴수있다.
//이 예에서는 두 개의 로딩 섹션이 단어에서 나오는 것을 볼 수 있습니다.

We have the Hello, Hydrogens section at the bottom that isn't like a string inverse, then the BackCountry collection that has a one-second additional artificial delay.
반대의 문자열이 아닌 Hello, Hydrogens라는 섹션이 아래쪽에 있다. 그리고 1초의 추가적인 이공적인 지연을 가진 BackCountry 컬렉션이 있다.
//아래쪽에는 스트링의 역방향이 아닌 Hello, Hydrogens 섹션이 있습니다. 그리고 1초의 추가적인 인공 지연이 있는 BackCountry 컬렉션이 있습니다.

And finally, the freestyle collection which has 1.5 second additional artificial delay.
마지막으로, 1.5초의 추가적인 인공 딜레이를 가진 프리스타일 컬렉션이 있다
//그리고 마지막으로, 1.5초의 추가적인 인공 지연을 가진 프리스타일 컬렉션.

Imagine that you create a much more engaging version of this loading state, like a skeleton of the product card to help structure the page layout.
너가 페이지 레이아웃 구조에 도와주는 제품 카드의 골격 같은 로딩 상태의 더 많은 매력적인 버전을 만든다고 상상해봐라
//페이지 레이아웃을 구성하는 데 도움이 되는 제품 카드의 골격과 같은 이 로딩 상태의 훨씬 더 매력적인 버전을 생성한다고 가정해 보십시오.

These contents can all be streamed in later with Suspense without compromising on the performance.
이러한 콘텐츠는 나중에 성능 감소없이 Suspense를 통해 모두 스트리밍할 할수있다.
//이러한 콘텐츠는 나중에 Suspension을 통해 성능에 영향을 주지 않고 모두 스트리밍할 수 있습니다.

React Server Component let the clients-side download only what is needed.
React Server Component 는 오직 필요로 한것들만 클라이언트 측에서 다운로드 할 수 있다.
//React Server Component는 클라이언트 측에서 필요한 것만 다운로드할 수 있도록 합니다.

Let's compare to client components demo between the homepage and the product page.
클라이언트 컴포넌트 데모와와 홈페이지의 제품페이지를 비교해보자 
//홈페이지와 제품 페이지의 고객 구성 요소 데모와 비교해 보겠습니다.

You will notice that the homepage does not download the product detail option or the gallery that are needed for the product page experience.
너는 홈페이지는 제품의 자세한 옵션 또는 제품 페이지 경험을 위해 필요한 갤러리를 다운로드 할 수 없다는 것을 알 수 있다.
//홈페이지에서 제품 페이지 경험에 필요한 제품 세부 정보 옵션이나 갤러리를 다운로드할 수 없습니다.

This is all thanks to the new way of how React Server Component hydrates a page.
이 모든 것은 React Server Component가 페이지를 공급하는 새로운 방법 덕분이다
//이 모든 것은 리액트 서버 구성 요소가 페이지에 수분을 공급하는 새로운 방법 덕분입니다.

Hydrogen will get the benefit of React Server Component as they evolve from Alpha to stable.
Hydrogen는 React Server Component가 알파에서 안정적으로 진화함에 따라 혜택을 가질 수 있다.
//수소는 Alpha에서 안정적으로 진화함에 따라 React Server Component의 이점을 얻게 될 것입니다.

Putting it all together, we get fast FCP with the small initial bundle and with React Server Components streaming, it will help us reach LCP and TTI faster by downloading only the asset that we need.
모든 것을 종합하면, 우리는 작은 초기 번들과 React Server Components 스트리밍을 통해 빠른 FCP를 가질 수 있고, 이것은 오직 우리가 필요한 자원만 다운로드하여 LCP와 TTI에 더 빠르게 닿을 수 있게 도와줄 수 있다.
//이 모든 것을 종합하면, 소규모 초기 번들과 React Server Components 스트리밍을 통해 FCP를 빠르게 얻을 수 있으며, 필요한 자산만 다운로드하여 LCP 및 TTI에 더 빠르게 도달할 수 있습니다.

These pieces will help improve both perceived and actual performance, so the buyers can start engaging with your brand right away.
이 조각들은 인식과 실제 성능 모두 향상시키게 도와줄 수 있고, 사용자들은 곧 너의 브랜드에서 매력적인 시작을 할 수 있다
//이 부품들은 인지도와 실제 성능을 모두 향상시키는 데 도움이 될 것이므로, 구매자들은 즉시 귀사의 브랜드와 제휴를 시작할 수 있습니다.

This is a big opportunity to improve the performance of commerce on the web.
이것은 웹에서 상거래의 성능을 향상시킬 수 있는 큰 기회다 
//이것은 웹에서 상거래의 성과를 향상시킬 수 있는 큰 기회입니다.

Which is why we're eager to get this in front of the community as soon as possible.
그래서 가능한 빨리 커뮤니티 앞에 선보이고자 열망하고 있다
//그래서 우리는 이것을 가능한 한 빨리 지역사회 앞에 알리고 싶습니다.

But now, Hydrogen is in developer preview.
하지만 지금, Hydrogen는 개발자 프리뷰이다.
//그러나 지금 수소는 개발자 프리뷰 중입니다.

We will continue to make it the best possible web development framework for commerce, for brands of all sizes.
우리는 그것을 모든 브랜드 사이즈를 위한 상거래에서 가능한 최고의 웹 개발 프레임워크로 만들기를 지속할 것이다.
//우리는 그것을 모든 크기의 브랜드를 위한 가능한 최고의 웹 개발 프레임워크로 계속 만들 것입니다.

We need to help.
우리는 도움이 필요합니다.

We make this open source for a reason.
우리가 이것은 오픈소스로 만드는 이유가 있다
//우리가 이 오픈소스를 만드는 데는 이유가 있습니다.

We believe in the power of many minds to make the tools we use as developers even better.
우리는 개발자로서 더 좋게 우리가 사용하는 도구를 만드는 정신적 힘을 믿는다
//우리는 개발자로서 사용하는 도구를 훨씬 더 좋게 만들 수 있는 많은 사람들의 힘을 믿습니다.

We're proud to be part of the Open-source community, which is why we're also working on contributing back.
우리는 오픈 소스 커뮤니티의 한 부분에 자랑스럽게 생각하고, 그리서 우리는 또한 기여하기위해 노력하고있다.
//우리는 오픈 소스 커뮤니티의 일원이 된 것을 자랑스럽게 생각합니다. 그래서 우리는 또한 기여하기 위해 노력하고 있습니다.

We build Webpack via plugin or React Server Component, and we love to get everyone's eyes and feedback on it.
우리는 플로그인 또는 React Server Component를 통해 웹펙을 제작하고, 또한 우리는 그것에 대한 모든 사람들의 관심과 피드백을 받는 것을 좋아한다.
//당사는 플러그인 또는 React Server Component를 통해 웹팩을 구축하고 있으며, 모든 사람들의 관심과 피드백을 얻고 있습니다.

We've also been contributing back to me, which powers Hydrogens developer experience to help make it ready for work environment and Edge Side Rendering.
우리는 또한 그것을 작업 환경과 Ege Side Rendering에 준비되게 만들 수 있게 도와주는 Hydrogens 개발자 경험 힘을 나에게 기여 하고있다
//우리는 또한 하이드로젠스 개발자 경험을 통해 작업 환경과 엣지 사이드 렌더링에 대비할 수 있도록 지원해 주었습니다.

There's a lot of opportunity to bring together some of the brightest developer on the web, within the open-source community.
오픈 소스 커뮤니티에서는 웹에서 몇몇의 명석한 개발자들을 가져올 많은 기회가 있다.
//오픈 소스 커뮤니티 내에서 웹상에서 가장 뛰어난 개발자들을 한자리에 모을 수 있는 많은 기회가 있습니다.

We look forward to continue working with this amazing group to help propel the future of commerce forward and make commerce better for everyone.
우리는 이 놀라운 그룹과 협력해서 상거래의 미래를 추진하고 더 나은 상거래를 만들 수 있기를 기대한다.
//우리는 이 놀라운 그룹과 계속 협력하여 상업의 미래를 추진하고 모두를 위해 더 나은 상업을 만들 수 있기를 기대합니다.

Feel free to check out Hydrogen or join the conversation in Github or Discord.
깃허브나 디스코드에서  Hydrogen을 자유롭게 확인하거나 상호작용해라 
//수소를 자유롭게 확인하거나 깃허브 또는 디스코드에서 대화에 참여하십시오.

All of this is available at shopify.dev/hydrogen.
이 모든 것은 shopify.dev/hydrogen에서 이용할 수 있습니다.

Thank you.
감사합니다.