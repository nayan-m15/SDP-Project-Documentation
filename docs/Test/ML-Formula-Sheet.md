# ML Formula Sheet


## Formula Sheet   COMS3007A/COMS3024A


## Machine Learning


## COMS3007A/COMS3024A


## University of the Witwatersrand, Johannesburg


## Formula Sheet

These formulas are provided for your reference during the examination.


## Probability & Na¨ ıve Bayes


## General Probability


## •   Sum Rule:   P   ( X ) =


## P


## Y   P   ( X, Y   )

•   Product Rule:   P   ( X, Y   ) =   P   ( X | Y   ) P   ( Y   )

•   Bayes’ Rule:   P   ( Y   | X ) =   P   ( X | Y   ) P   ( Y   )


## P   ( X )


## Na¨ ıve Bayes Classifier


## •   Posterior (with conditional independence):


## P   ( C   =   c k | X   =   x ) =


## P   ( C = c k   )   Q n


## i =1   P   ( X i = x i | C = c k   )


## P   ( X = x )

•   MAP Solution:   c ∗   = arg max c k   P   ( C   =   c k | X   =   x )

•   Laplace Smoothing ( k   is smoothing parameter,   V   is number of possible values for


## feature   X i ):


## P   ( X i   =   x ij   | C   =   c ) =


## count( X i = x ij   ,C = c )+ k


## count( C = c )+ kV


## Decision Trees


## •   Entropy:   H ( S ) =   −


## P C


## i =1   p i   log 2 ( p i )


## •   Information Gain:


## Gain ( S, A ) =   H ( S )   −


## P


## v ∈ V alues ( A )


## | S v   |


## | S |   H ( S v )


## Page 1 of 3


---


## Formula Sheet   COMS3007A/COMS3024A


## Linear Regression


## •   Model:   h θ ( x ) =


## P d


## j =0   θ j   ϕ j   ( x ) =   θ T   ϕ ( x )


## (with   ϕ 0 ( x ) = 1)

•   Cost (SSE, single example   i ):   J i ( θ ) =   1


## 2   ( h θ ( x ( i ) )   −   y ( i ) ) 2

•   Gradient Component (for   θ j   , single example   i ):


## ∂J i ( θ )

∂θ j   = ( h θ ( x ( i ) )   −   y ( i ) ) ϕ j   ( x ( i ) )

•   Gradient Descent Update (single example   i ):

θ j   ←   θ j   −   α ( h θ ( x ( i ) )   −   y ( i ) ) ϕ j   ( x ( i ) )


## Logistic Regression


## •   Sigmoid (Logistic) Function:   σ ( z ) =   1


## 1+ e − z


## •   Model:   h θ ( x ) =   σ ( θ T   ϕ ( x ))


## (with   ϕ 0 ( x ) = 1)

•   Cost (Cross-Entropy, single example   i ,   y ( i )   ∈ { 0 ,   1 } ):

J i ( θ ) =   − [ y ( i )   log( h θ ( x ( i ) )) + (1   −   y ( i ) ) log(1   −   h θ ( x ( i ) ))]

•   Gradient Component (for   θ j   , single example   i ):


## ∂J i ( θ )

∂θ j   = ( h θ ( x ( i ) )   −   y ( i ) ) ϕ j   ( x ( i ) )

•   Gradient Descent Update (single example   i ):

θ j   ←   θ j   −   α ( h θ ( x ( i ) )   −   y ( i ) ) ϕ j   ( x ( i ) )


## Neural Networks

•   Sigmoid Activation:   g ( z ) =   σ ( z ) =   1


## 1+ e − z

•   Derivative of Sigmoid:   g ′ ( z ) =   g ( z )(1   −   g ( z ))


## •   Net input to neuron   i   in layer   l :   z


## ( l )


## i   =


## P


## j   θ


## ( l − 1)


## ij   a


## ( l − 1)


## j   (includes bias   a


## ( l − 1)


## 0   = 1)


## •   Activation of neuron   i   in layer   l :   a


## ( l )


## i   =   g ( z


## ( l )


## i   )

•   Error Term (Output Layer   L , neuron   k ):   δ


## ( L )


## k   =   a


## ( L )


## k   −   y k


## •   Error Term (Hidden Layer   l , neuron   j ):


## δ


## ( l )


## j   =


##  P


## k   θ


## ( l )


## kj   δ


## ( l +1)


## k


## 


## g ′ ( z


## ( l )


## j   )


## •   Gradient Component (for   θ


## ( l − 1)


## ij   for one example):


## ∂J (Θ)


## ∂θ ( l − 1)


## ij


## =   a


## ( l − 1)


## j   δ


## ( l )


## i


## •   Weight Update:   θ


## ( l − 1)


## ij   ←   θ


## ( l − 1)


## ij   −   α   ∂J (Θ)


## ∂θ ( l − 1)


## ij


## Page 2 of 3


---


## Formula Sheet   COMS3007A/COMS3024A


## K-means Clustering


## •   Euclidean Distance (squared):

d ( x i ,   x j   ) 2   =   || x i   −   x j   || 2   =


## P D

k =1 ( x i,k   −   x j,k ) 2   (for   D   dimensions)


## •   K-means Objective (sum of squared errors):


## J   =


## P N

i =1   || x i   −   μ c i   || 2   ( μ c i   is centroid of cluster for   x i )

•   Centroid Update for cluster   k :   μ k   =   1


## | S k   |


## P


## x i ∈ S k   x i


## Evaluation Metrics (Classification)

(TP: True Positives, TN: True Negatives, FP: False Positives, FN: False Negatives)


## •   Accuracy:   T P   + T N


## T P   + T N   + F P   + F N


## •   Precision (positive class):   T P


## T P   + F P


## •   Recall / TPR (positive class):   T P


## T P   + F N

•   F1-Score (positive class): 2   ×   Precision × Recall


## Precision+Recall


## Reinforcement Learning


## •   Discount Factor: 0   ≤   γ   ≤   1


## •   State-Value Function:

V   π ( s ) =   E π [ R t +1   +   γV   π ( S t +1 ) | S t   =   s ]


## •   TD Learning Update for   V   ( S t ):

V   ( S t )   ←   V   ( S t ) +   α [ R t +1   +   γV   ( S t +1 )   −   V   ( S t )]


## Page 3 of 3