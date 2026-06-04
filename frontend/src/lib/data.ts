export const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const engagementData = months.map((m, i) => ({
  month: m,
  sessions: 4200 + Math.round(Math.sin(i) * 800 + (i * 137) % 600),
  pageviews: 18000 + Math.round(Math.cos(i) * 3000 + (i * 211) % 2000),
  conversions: 380 + Math.round(Math.sin(i * 0.8) * 80 + (i * 73) % 60),
  churnRisk: 12 + Math.round(Math.cos(i * 0.6) * 4 + (i * 31) % 3),
}))

export const behaviorFlowData = [
  { name: 'Home', users: 10000 },
  { name: 'Product', users: 7200 },
  { name: 'Detail', users: 5100 },
  { name: 'Cart', users: 2800 },
  { name: 'Checkout', users: 1400 },
  { name: 'Purchase', users: 980 },
]

export const userSegments = [
  { name: 'Power Users', value: 18, color: '#0ea5e9', users: 4320 },
  { name: 'Regular Users', value: 35, color: '#8b5cf6', users: 8400 },
  { name: 'Casual Users', value: 28, color: '#10b981', users: 6720 },
  { name: 'At-Risk Users', value: 12, color: '#f59e0b', users: 2880 },
  { name: 'Churned Users', value: 7, color: '#f43f5e', users: 1680 },
]

export const mlModels = [
  { name: 'Behavior LSTM', type: 'Deep Learning', accuracy: 94.7, precision: 93.2, recall: 95.1, f1: 94.1, confidence: 96.3, status: 'production' },
  { name: 'Intent XGBoost', type: 'Gradient Boost', accuracy: 91.3, precision: 90.8, recall: 92.1, f1: 91.4, confidence: 93.7, status: 'production' },
  { name: 'Churn RF', type: 'Random Forest', accuracy: 89.6, precision: 88.4, recall: 90.7, f1: 89.5, confidence: 91.2, status: 'production' },
  { name: 'Engagement CNN', type: 'Neural Network', accuracy: 87.9, precision: 86.3, recall: 89.2, f1: 87.7, confidence: 88.9, status: 'staging' },
  { name: 'Anomaly IForest', type: 'Unsupervised', accuracy: 92.1, precision: 91.7, recall: 92.8, f1: 92.2, confidence: 94.0, status: 'production' },
  { name: 'Sentiment BERT', type: 'Transformer', accuracy: 93.4, precision: 92.9, recall: 93.8, f1: 93.3, confidence: 95.1, status: 'production' },
]

export const realtimeUsers = [
  { id:'u1001', name:'Alice Chen', page:'/products', duration:240, intent:'Purchase', churnRisk:8, engagementScore:92, country:'US' },
  { id:'u1002', name:'Bob Malik', page:'/', duration:45, intent:'Browse', churnRisk:62, engagementScore:34, country:'PK' },
  { id:'u1003', name:'Carol Singh', page:'/checkout', duration:380, intent:'Purchase', churnRisk:5, engagementScore:97, country:'IN' },
  { id:'u1004', name:'David Kim', page:'/dashboard', duration:720, intent:'Onboarding', churnRisk:15, engagementScore:78, country:'KR' },
  { id:'u1005', name:'Eva Patel', page:'/pricing', duration:180, intent:'Research', churnRisk:31, engagementScore:61, country:'UK' },
  { id:'u1006', name:'Frank Liu', page:'/features', duration:290, intent:'Research', churnRisk:22, engagementScore:74, country:'CA' },
  { id:'u1007', name:'Grace Park', page:'/profile', duration:120, intent:'Support', churnRisk:44, engagementScore:52, country:'AU' },
  { id:'u1008', name:'Henry Wu', page:'/products', duration:560, intent:'Purchase', churnRisk:9, engagementScore:88, country:'SG' },
  { id:'u1009', name:'Iris Nair', page:'/contact', duration:90, intent:'Support', churnRisk:71, engagementScore:28, country:'IN' },
  { id:'u1010', name:'Jack Zhang', page:'/blog', duration:310, intent:'Browse', churnRisk:18, engagementScore:69, country:'US' },
]

export const predictions = [
  { label:'Aug', predicted:4920, lower:4400, upper:5440 },
  { label:'Sep', predicted:5180, lower:4620, upper:5740 },
  { label:'Oct', predicted:5440, lower:4830, upper:6050 },
  { label:'Nov', predicted:5820, lower:5180, upper:6460 },
  { label:'Dec', predicted:6200, lower:5510, upper:6890 },
  { label:'Jan', predicted:5700, lower:5080, upper:6320 },
  { label:'Feb', predicted:5980, lower:5320, upper:6640 },
  { label:'Mar', predicted:6350, lower:5640, upper:7060 },
]

export const featureImportance = [
  { feature: 'Session Duration', importance: 23 },
  { feature: 'Page Depth', importance: 18 },
  { feature: 'Return Frequency', importance: 16 },
  { feature: 'Click Rate', importance: 14 },
  { feature: 'Cart Interactions', importance: 12 },
  { feature: 'Search Queries', importance: 9 },
  { feature: 'Time of Day', importance: 8 },
]

export const kpiData = {
  totalUsers: { value: 124830, change: 8.4, label: 'Total Users', up: true },
  activeUsers: { value: 48921, change: 12.7, label: 'Active Users', up: true },
  churnRate: { value: 4.2, change: 1.3, label: 'Churn Rate %', up: false },
  engagementScore: { value: 78.4, change: 3.1, label: 'Avg Engagement', up: true },
  conversionRate: { value: 9.8, change: 0.6, label: 'Conversion Rate %', up: true },
  predictionAccuracy: { value: 94.7, change: 1.2, label: 'Model Accuracy %', up: true },
  revenueAtRisk: { value: 28400, change: 8.2, label: 'Revenue at Risk $', up: false },
  retentionRate: { value: 87.3, change: 2.4, label: 'Retention Rate %', up: true },
}

export const anomalies = [
  { id:'a1', type:'Spike', metric:'Bounce Rate', value:'+34%', severity:'high', time:'2 min ago', description:'Unusual bounce rate spike on /pricing page' },
  { id:'a2', type:'Drop', metric:'Session Duration', value:'-28%', severity:'medium', time:'15 min ago', description:'Session duration drop for mobile users' },
  { id:'a3', type:'Anomaly', metric:'Conversion Rate', value:'-12%', severity:'medium', time:'1 hr ago', description:'Conversion rate dip for US East coast segment' },
  { id:'a4', type:'Spike', metric:'Cart Abandonment', value:'+21%', severity:'high', time:'2 hr ago', description:'Cart abandonment spike at checkout step 2' },
  { id:'a5', type:'Pattern', metric:'Login Failures', value:'+89%', severity:'critical', time:'3 hr ago', description:'Unusual login failure pattern detected' },
]

export const journeyStages = [
  { stage:'Awareness', users:100000, dropoff:0 },
  { stage:'Discovery', users:72000, dropoff:28 },
  { stage:'Consideration', users:48000, dropoff:33 },
  { stage:'Intent', users:28000, dropoff:42 },
  { stage:'Purchase', users:9800, dropoff:65 },
  { stage:'Retention', users:7200, dropoff:27 },
]

export const radarData = [
  { metric:'Accuracy', LSTM:95, XGBoost:91, RF:90 },
  { metric:'Precision', LSTM:93, XGBoost:91, RF:88 },
  { metric:'Recall', LSTM:95, XGBoost:92, RF:91 },
  { metric:'F1 Score', LSTM:94, XGBoost:91, RF:90 },
  { metric:'Confidence', LSTM:96, XGBoost:94, RF:91 },
]
