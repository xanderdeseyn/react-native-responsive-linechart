import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const features = [
  {
    title: <>Written in Typescript</>,
    imageUrl: 'img/typescript.svg',
    description: <>This library is 100% written in Typescript, types are bundled with the package.</>,
  },
  {
    title: <>Composable API</>,
    imageUrl: 'img/source.png',
    description: <>Every part of the chart has its own component. This allows you to easily compose your chart with the features you need.</>,
  },
  {
    title: <>Small package size</>,
    imageUrl: 'img/box.svg',
    description: <>Almost no dependencies, total package size is only 62 kilobytes unzipped.</>,
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title" style={{ color: 'black' }}>
            {siteConfig.title}
          </h1>
          <p className="hero__subtitle" style={{ color: 'black' }}>
            {siteConfig.tagline}
          </p>
          <div className={styles.buttons}>
            <Link className={clsx('button button--outline  button--lg', styles.getStarted)} style={{ backgroundColor: '#1d6ca1' }} to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', marginTop: 24 }}>Screenshots</h2>
          <img style={{ width: 1000 }} src="https://github.com/N1ghtly/react-native-responsive-linechart/raw/master/src/docs/screenshots/home.png" />
        </div>
        <h2 style={{ textAlign: 'center', marginTop: 64 }}>Features</h2>
        {features && features.length > 0 && (
          <section className={styles.features} style={{ paddingTop: 0 }}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
